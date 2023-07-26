import { Dream, DreamContent } from "@prisma/client";
import { create } from "zustand";

import MyLocalStorage from "better-localstorage";

const myStorage =
  typeof window !== "undefined"
    ? new MyLocalStorage("LucidLock", "LucidLockData")
    : undefined;

enum Items {
  Dreams = "dreams",
  StaleDeletions = "staleDeletions",
  StaleEdits = "staleEdits",
}

type DreamStore = {
  dreams: Dream[];
  getDreams: () => void;
  getDreamContent: (id: string) => Promise<DreamContent | undefined>;
  addDream: (dream: Dream, dreamContent: DreamContent) => void;
  editDream: (
    id: string,
    dream: Dream,
    dreamContent: DreamContent
  ) => Promise<void>;
  removeDream: (id: string, dreamContentId: string) => void;
  getStaleDeletions: () => Promise<string[] | undefined>;
  getStaleEdits: () => Promise<string[] | undefined>;
  syncWithServer: () => void;
};

const useDreamStore = create<DreamStore>((set, get) => ({
  dreams: [],
  getDreams: async () => {
    const dreams = await myStorage?.getItem("dreams");
    if (dreams) {
      set({ dreams: JSON.parse(dreams) });
    }
  },
  getDreamContent: async (dreamId: string) => {
    const targetDream = get().dreams.find((dream) => dream.id === dreamId);
    if (!targetDream) return undefined;
    const dreamContent = await myStorage?.getItem(targetDream.dreamContentId);
    if (dreamContent) {
      return JSON.parse(dreamContent);
    }
  },
  addDream: async (dream: Dream, dreamContent: DreamContent) => {
    await myStorage?.setItem(
      Items.Dreams,
      JSON.stringify([dream, ...get().dreams])
    );
    await myStorage?.setItem(
      dream.dreamContentId,
      JSON.stringify(dreamContent)
    );
    get().getDreams();
  },
  editDream: async (id: string, dream: Dream, dreamContent: DreamContent) => {
    const targetDream = get().dreams.find((dream) => dream.id === id);

    if (targetDream) {
      const newDream = dream;
      const dataToSet = get().dreams.map((dream) => {
        if (dream.id === id) {
          return newDream;
        }
        return dream;
      });
      await myStorage?.set(Items.Dreams, JSON.stringify(dataToSet));

      const staleEdits: string[] = JSON.parse(
        (await myStorage?.getItem(Items.StaleEdits)) || "[]"
      );
      await myStorage?.setItem(dreamContent.id, JSON.stringify(dreamContent));
      // Add this dream to the stale edits list if it's not already there

      if (!staleEdits?.includes(id)) {
        await myStorage?.set(
          Items.StaleEdits,
          !!staleEdits
            ? JSON.stringify([id, ...staleEdits])
            : JSON.stringify([id])
        );
      }

      get().getDreams();
    }
  },
  removeDream: async (id: string, dreamContentId: string) => {
    await myStorage?.set(
      Items.Dreams,
      JSON.stringify(get().dreams.filter((dream) => dream.id !== id))
    );
    //@ts-expect-error Package creator forgot to add parameter type to delete method
    await myStorage?.delete(dreamContentId);

    const staleDeletions: string[] = JSON.parse(
      (await myStorage?.getItem(Items.StaleDeletions)) || "[]"
    );
    const staleEdits: string[] = JSON.parse(
      (await myStorage?.getItem(Items.StaleEdits)) || "[]"
    );

    // Since we are removing this dream, we can remove it from the stale edits list if it's there
    if (staleEdits?.includes(id)) {
      await myStorage?.set(
        Items.StaleEdits,
        JSON.stringify(staleEdits.filter((editId) => editId !== id))
      );
    }
    // Add this dream to the stale deletions list if it's not already there
    if (!staleDeletions?.includes(id)) {
      await myStorage?.set(
        Items.StaleDeletions,
        JSON.stringify([id, staleDeletions || []])
      );
    }

    get().getDreams();
  },
  getStaleDeletions: async () => {
    const staleDeletions = await myStorage?.getItem(Items.StaleDeletions);
    if (staleDeletions) {
      return JSON.parse(staleDeletions);
    } else {
      return undefined;
    }
  },
  getStaleEdits: async () => {
    const staleEdits = await myStorage?.getItem(Items.StaleEdits);
    if (staleEdits) {
      return JSON.parse(staleEdits);
    } else {
      return undefined;
    }
  },
  syncWithServer: async () => {
    // Simluate sync
    const stales = await Promise.all([
      get().getStaleDeletions(),
      get().getStaleEdits(),
    ]);

    const staleDeletions = stales[0];
    const staleEdits = stales[1];

    // Data to server

    // Clean up
    myStorage?.set(Items.StaleDeletions, JSON.stringify([]));
    myStorage?.set(Items.StaleEdits, JSON.stringify([]));
  },
}));

export default useDreamStore;

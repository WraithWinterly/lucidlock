import { Dream, DreamContent } from "@prisma/client";
import { create } from "zustand";

import MyLocalStorage from "better-localstorage";

const myStorage =
  typeof window !== "undefined"
    ? new MyLocalStorage("LucidLock", "LucidLockData")
    : undefined;

enum Items {
  Dreams = "dreams",
  PendingDeletions = "pendingDeletions",
}

type DreamStore = {
  dreams: Dream[];
  getDreams: () => void;
  getDreamContent: (id: string) => Promise<DreamContent | undefined>;
  addDream: (dream: Dream, dreamContent: DreamContent) => void;
  removeDream: (id: string, dreamContentId: string) => void;
  editDream: (
    id: string,
    dream: Dream,
    dreamContent: DreamContent
  ) => Promise<void>;
  getPendingDeletions: () => Promise<string[] | undefined>;
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
    console.log("asdf", targetDream);
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
  removeDream: async (id: string, dreamContentId: string) => {
    const deletions = await myStorage?.getItem(Items.PendingDeletions);
    await myStorage?.set(
      Items.PendingDeletions,
      JSON.stringify([id, ...(deletions || [])])
    );
    await myStorage?.set(
      Items.Dreams,
      JSON.stringify(get().dreams.filter((dream) => dream.id !== id))
    );
    //@ts-expect-error Package creator forgot to add parameter type to delete method
    await myStorage?.delete(dreamContentId);

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
      await myStorage?.setItem(dreamContent.id, JSON.stringify(dreamContent));
      get().getDreams();
    }
  },
  getPendingDeletions: async () => {
    const pendingDeletions = await myStorage?.getItem(Items.PendingDeletions);
    if (pendingDeletions) {
      return JSON.parse(pendingDeletions);
    } else {
      return undefined;
    }
  },
}));

export default useDreamStore;

import { Dream } from "@prisma/client";
import { useEffect, useState } from "react";
import { set } from "zod";
import useDreamStore from "~/stores/dreamStore";

export default function DeleteDream({
  dream,
  onComplete,
}: {
  dream: Dream | undefined;
  onComplete: () => void;
}) {
  const getDreamContent = useDreamStore((state) => state.getDreamContent);

  const [dreamContentId, setDreamContentId] = useState<string>();

  useEffect(() => {
    if (!dream) return;
    getDreamContent(dream.id).then((res) => {
      setDreamContentId(res?.id);
    });
  }, [dream]);

  const removeDream = useDreamStore((state) => state.removeDream);
  async function deleteDream() {
    if (!dream) return;
    if (!dreamContentId) return;
    await removeDream(dream.id, dreamContentId);
    onComplete();
  }

  return (
    <div className="flex flex-col gap-2">
      <h2>
        Delete <i>{dream?.title}</i>?
      </h2>
      <p>
        Are you sure you want to delete this? You will not be able to get this
        dream back, <i>ever</i>.
      </p>
      <div className="flex flex-row gap-4">
        <button className="btn flex-1" onClick={() => onComplete()}>
          No
        </button>
        <button className="btn-error btn px-6" onClick={deleteDream}>
          Yes
        </button>
      </div>
    </div>
  );
}

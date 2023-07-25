import { Dream, DreamContent } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import useDreamStore from "~/stores/dreamStore";

export default function EditDream({
  dream,
  onSuccess,
}: {
  dream: Dream | undefined;
  onSuccess: () => void;
}) {
  const [newDreamTitle, setNewDreamTitle] = useState<string>(
    dream?.title || ""
  );
  const [newDreamContent, setNewDreamContent] = useState<string>();

  const editDream = useDreamStore((state) => state.editDream);

  const [dreamContent, setDreamContent] = useState<DreamContent>();

  const getDreamContent = useDreamStore((state) => state.getDreamContent);

  useEffect(() => {
    if (!dream) return;
    getDreamContent(dream.id).then((res) => {
      setDreamContent(res);
      setNewDreamContent(res?.content);
    });
  }, [editDream]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newDreamTitle || newDreamTitle.length < 1) {
      return;
    }
    if (!newDreamContent || newDreamContent.length < 1) {
      return;
    }
    if (!dream || !dream.id) return;
    await editDream(
      dream.id,
      {
        id: dream?.id,
        title: newDreamTitle,
        createdAt: dream.createdAt,
        updatedAt: dream.updatedAt,
        pendingDeletion: dream.pendingDeletion,
        userId: "",
        dreamContentId: dream.dreamContentId,
      },
      {
        content: newDreamContent,
        id: dream.dreamContentId,
      }
    );
    onSuccess();
  }
  return (
    <div className="flex w-full flex-col">
      <h2>
        Editing <i>{dream?.title}</i>
      </h2>
      {!!dream && !!dreamContent ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label>Title:</label>
            <input
              type="text"
              value={newDreamTitle}
              className="input"
              onChange={(e) => setNewDreamTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Content:</label>
            <textarea
              value={newDreamContent}
              onChange={(e) => setNewDreamContent(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn">
            Submit Dream
          </button>
        </form>
      ) : (
        <div>Not Found</div>
      )}
      {/* <LoadingSpinner loading={loading} />
      {error && <Alert type="info">Error: {error}</Alert>} */}

      {/* <p className="break-words">
        Data: {JSON.stringify(data?.dream?.DreamContent?.content)}
      </p> */}
    </div>
  );
}

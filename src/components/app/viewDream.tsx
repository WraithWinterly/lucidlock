import { Dream, DreamContent } from "@prisma/client";
import { useEffect, useState } from "react";
import useDreamStore from "~/stores/dreamStore";

export default function ViewDream({ dream }: { dream: Dream | undefined }) {
  const getDreamContent = useDreamStore((state) => state.getDreamContent);
  const [dreamContent, setDreamContent] = useState<DreamContent>();
  useEffect(() => {
    if (!dream) return;
    getDreamContent(dream.id).then((res) => {
      setDreamContent(res);
    });
  }, [dream]);

  return (
    <div className="flex w-full flex-col">
      {!!dream && !!dreamContent ? (
        <div>
          <h2>
            Viewing <i>{dream.title}</i>
          </h2>
          <p>
            Created{" "}
            {!!dream.createdAt && new Date(dream.createdAt).toDateString()}
          </p>
          <p>{dreamContent.content}</p>
        </div>
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

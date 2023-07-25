import { Dream } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function DreamCard({
  dream,
  setViewModalShown,
  setViewDream,
  setEditModalShown,
  setEditDream,
  setDeleteModalShown,
  setDeleteDream,
}: {
  dream: Dream;
  setViewModalShown: Dispatch<SetStateAction<boolean>>;
  setViewDream: Dispatch<SetStateAction<Dream | undefined>>;
  setEditModalShown: Dispatch<SetStateAction<boolean>>;
  setEditDream: Dispatch<SetStateAction<Dream | undefined>>;
  setDeleteModalShown: Dispatch<SetStateAction<boolean>>;
  setDeleteDream: Dispatch<SetStateAction<Dream | undefined>>;
}) {
  const { title, createdAt, updatedAt } = dream;

  return (
    <div className="group relative rounded-lg bg-violet-900/70 p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {/* <p className="text-gray-700">{dreamContent.content}</p> */}
      <div className="mt-4 text-sm text-gray-300">
        <p>Created on: {new Date(createdAt).toLocaleDateString()}</p>
        {!!updatedAt && (
          <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setViewModalShown(true);
              setViewDream(dream);
            }}
            className="btn"
          >
            View
          </button>
          <button
            onClick={() => {
              setEditModalShown(true);
              setEditDream(dream);
            }}
            className="btn"
          >
            Edit
          </button>
          <button
            className="btn absolute right-0 top-0 bg-opacity-50 p-1 px-3 opacity-0 animate-in group-hover:opacity-100"
            onClick={() => {
              setDeleteModalShown(true);
              setDeleteDream(dream);
            }}
          >
            <AiOutlineDelete size={28} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

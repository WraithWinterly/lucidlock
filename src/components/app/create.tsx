import { useRouter } from "next/router";
import React, { useState } from "react";

import { v4 as uuid } from "uuid";
import useDreamStore from "~/stores/dreamStore";

export default function Create({ onSubmit }: { onSubmit: () => void }) {
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamContent, setDreamContent] = useState("");

  const addDream = useDreamStore((state) => state.addDream);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const dreamContentId = uuid();
      addDream(
        {
          id: uuid(),
          createdAt: new Date(),
          title: dreamTitle,
          updatedAt: null,
          pendingDeletion: false,
          userId: "",
          dreamContentId: dreamContentId,
        },
        {
          id: dreamContentId,
          content: dreamContent,
        }
      );

      // Clear the form fields
      setDreamTitle("");
      setDreamContent("");
      onSubmit();
    } catch (error) {
      console.error("Error creating dream:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <label>Title:</label>
        <input
          type="text"
          value={dreamTitle}
          className="input"
          onChange={(e) => setDreamTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Content:</label>
        <textarea
          value={dreamContent}
          onChange={(e) => setDreamContent(e.target.value)}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn">
        Submit Dream
      </button>
    </form>
  );
}

"use client";

import { Dream } from "@prisma/client";
import { use, useEffect, useState } from "react";
import Create from "~/components/app/create";
import DeleteDream from "~/components/app/deleteDream";
import EditDream from "~/components/app/editDream";
import ViewDream from "~/components/app/viewDream";
import DreamCard from "~/components/dreamCard";
import Modal from "~/components/ui/modal";
import useDreamStore from "~/stores/dreamStore";

export default function App() {
  const dreams = useDreamStore((state) => state.dreams);
  const getDreams = useDreamStore((state) => state.getDreams);
  const [createModalShown, setCreateModalShown] = useState(false);

  // View Dream by ID
  const [viewModalShown, setViewModalShown] = useState(false);
  const [viewDream, setViewDream] = useState<Dream>();

  // Edit Dream by ID
  const [editModalShown, setEditModalShown] = useState(false);
  const [editDream, setEditDream] = useState<Dream>();

  // Delete by ID
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [deleteDream, setDeleteDream] = useState<Dream>();

  useEffect(() => {
    getDreams();
  }, []);

  // force refresh modals when other is opened (modal looks for id change)
  useEffect(() => {
    setEditDream(undefined);
    setDeleteDream(undefined);
  }, [viewModalShown]);
  useEffect(() => {
    setViewDream(undefined);
    setDeleteDream(undefined);
  }, [editModalShown]);
  useEffect(() => {
    setViewDream(undefined);
    setEditDream(undefined);
  }, [deleteModalShown]);

  const getStaleDeletions = useDreamStore((state) => state.getStaleDeletions);
  const getStaleEdits = useDreamStore((state) => state.getStaleEdits);

  const [deldata, setDelData] = useState<string[] | undefined>([]);
  const [editdata, setEditData] = useState<string[] | undefined>([]);

  useEffect(() => {
    getStaleDeletions().then((res) => {
      setDelData(res);
    });
    getStaleEdits().then((res) => {
      setEditData(res);
    });
  }, [Math.random()]);

  return (
    <div className="flex w-full max-w-6xl flex-col">
      <p>
        Stale Deletions:
        {deldata?.map((id) => (
          <p>{id}</p>
        ))}
      </p>
      <p>
        Stale Edits:
        {editdata?.map((id) => (
          <p>{id}</p>
        ))}
      </p>

      <button
        className="btn-success btn mx-auto mb-8 w-96"
        onClick={() => setCreateModalShown(true)}
      >
        Create Dream
      </button>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dreams?.map((dream) => (
          <DreamCard
            key={dream.id}
            dream={dream}
            setViewModalShown={setViewModalShown}
            setViewDream={setViewDream}
            setEditModalShown={setEditModalShown}
            setEditDream={setEditDream}
            setDeleteModalShown={setDeleteModalShown}
            setDeleteDream={setDeleteDream}
          />
        ))}
      </div>
      {dreams?.length === 0 && (
        <p className="text-center text-xl">No dreams yet.</p>
      )}
      <Modal
        title="Create Dream"
        shown={createModalShown}
        setShown={setCreateModalShown}
      >
        <Create onSubmit={() => setCreateModalShown(false)} />
      </Modal>
      <Modal shown={viewModalShown} setShown={setViewModalShown}>
        <ViewDream dream={viewDream} />
      </Modal>
      <Modal shown={editModalShown} setShown={setEditModalShown}>
        <EditDream
          dream={editDream}
          onSuccess={() => setEditModalShown(false)}
        />
      </Modal>
      <Modal shown={deleteModalShown} setShown={setDeleteModalShown}>
        <DeleteDream
          onComplete={() => setDeleteModalShown(false)}
          dream={deleteDream}
        />
      </Modal>
    </div>
  );
}

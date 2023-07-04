// pages/api/dream.ts

import { NextApiRequest, NextApiResponse } from "next";
import { GetDream } from "../_shared/apiTypes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const dream = getDream();
    res.status(200).json({ dream });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

function getDream(): GetDream["Response"] {
  const sampleDream =
    "Last night, I dreamt I was flying through a magical forest filled with vibrant colors and talking animals. It felt so surreal and exhilarating!";
  return {
    dream: sampleDream,
  };
}

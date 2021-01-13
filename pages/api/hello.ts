// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Show } from "../../db/entity";
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import connectionMiddleware, { ExtendedRequest } from "../api/middleware/middleware"

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(connectionMiddleware);

handler.get<ExtendedRequest>(async (req, res) => {
  const showRepo = req.dbConnection.getRepository<Show>("Show");
  let showQuery = showRepo.createQueryBuilder("shows");

  const shows: Show[] = await showQuery.getMany();
  res.status(200).json({ shows });
});

export default handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { initializeDatabase } from "../../db";
import { Show } from "../../db/entity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const connection = await initializeDatabase();
  const showRepo = connection.getRepository<Show>("Show");

  let showQuery = showRepo.createQueryBuilder("shows");

  const shows: Show[] = await showQuery.getMany();
  res.status(200).json({ shows });
};

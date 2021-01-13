import { initializeDatabase } from "../../../db";
import { NextApiRequest, NextApiResponse } from 'next';
import type { Connection } from "typeorm";

export interface ExtendedRequest { dbConnection: Connection };

const connectionMiddleware = async (req: NextApiRequest & ExtendedRequest, res: NextApiResponse, next) => {
    const db = initializeDatabase();
    const dbConnection = await db();

    req.dbConnection = dbConnection;

    next();
}

export default connectionMiddleware;
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { Show, Genre, Language, Network } from './entity';
import 'reflect-metadata';

export const initializeDatabase = async (): Promise<Connection> => {
    const options: ConnectionOptions = {
        type: "postgres",
        host: process.env.TYPEORM_HOST,
        entities: [Show, Genre, Language, Network],
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: true // verifies that db matches entities
    };
    const connection = await createConnection(options);
    return connection;
};
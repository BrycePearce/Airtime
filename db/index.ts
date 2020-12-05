import 'reflect-metadata';
import { Show, Genre, Language, Network, Season, Episode } from './entity';
import { createConnection, ConnectionOptions, Connection } from "typeorm";

export const initializeDatabase = async (): Promise<Connection> => {
    const options: ConnectionOptions = {
        type: "postgres",
        host: process.env.TYPEORM_HOST,
        entities: [Show, Genre, Language, Network, Season, Episode],
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: true // verifies that db matches entities
    };
    const connection = await createConnection(options);
    return connection;
};
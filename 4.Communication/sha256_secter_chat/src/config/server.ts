import express, { Express } from 'express';
import { port } from './envVar';
export const initializeServer = (): Express => {
    const app = express();

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    })
}
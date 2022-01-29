import express, { Express } from 'express';
import { port } from './envVar';
import calendarRoutes from '../Routes/CalendarRoutes';

export const initializeServer = () => {
    const app = express();

    app.use(express.json());

    app.use("/", calendarRoutes.router);
    
    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}
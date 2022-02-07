import express, { Express } from 'express';
import { port, scopes } from './envVar';
import calendarRoutes from '../Routes/CalendarRoutes';
import googleOAuthRoutes from '../Routes/GoogleOAuthRoutes';

export const initializeServer = () => {
    const app = express();

    app.use(express.json());

    app.use("/", calendarRoutes.router);
    app.use("/google", googleOAuthRoutes.router);
    console.log(scopes)
    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}
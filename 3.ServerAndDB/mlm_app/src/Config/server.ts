import express, { Express } from 'express';
import { port } from './envVar';
import userRouter from '../Routes/UserRoutes';
import mlmRoutes from '../Routes/MlmRoutes';
import googleRoutes from '../Routes/GoogleRoutes';
import githubRoutes from '../Routes/GithubRoutes';
import passport from 'passport';
import { PassportHandler } from '../Handlers/PassportHandler';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());

    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj: any, cb) => cb(null, obj));
    passport.use(PassportHandler.GoogleStrategy());
    passport.use(PassportHandler.GithubStrategy());

    app.use("/", googleRoutes.router);
    app.use("/user", userRouter.router);
    app.use("/", mlmRoutes.router);
    app.use("/", githubRoutes.router);

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    })
}
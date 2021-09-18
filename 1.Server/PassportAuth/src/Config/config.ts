import express, { Express } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { facebookStrategy, googleStrategy, githubStrategy, localStrategy } from '../Passport/passportStrategies';
import authRoutes from '../Routes/AuthRoutes';
import connectWithMongoDB from '../db/mongoConnect';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { envVar } from './envVar';

dotenv.config();

export const initializeServer = (): Express => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', 'src/Views');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(session({
        secret: 'Some secret',
        store: MongoStore.create({
            mongoUrl: envVar.connectMongoDB
        }),
        cookie: {
            maxAge: 60000 * 60 * 24
        },
        saveUninitialized: false,
        resave: false,
        name: 'Passport Auth'
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj: any, cb) => cb(null, obj));
    passport.use(googleStrategy);
    passport.use(facebookStrategy);
    passport.use(githubStrategy);
    passport.use(localStrategy);

    app.use("/", authRoutes.router);

    connectWithMongoDB();

    startServer(app);
    return app;
}

const startServer = (server: express.Application): void => {
    server.listen(process.env.PORT, () => {
        console.log(`Listening on port: ${process.env.PORT}`);
    });
}
import express, { Express } from 'express';
import path from 'path';
import routes from '../Routes/routes';
import { port, mongoURI } from './envVariables';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';
const methodOverride = require('method-override');
import { discordStrategy } from '../Services/Passport/passportStrategies';
import { connectWithMongoDB } from '../Services/MongoDB/mongoConnect';
import User from '../Services/MongoDB/userModel';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride('_method'));
    app.set("view engine", "ejs");
    app.set("views", path.resolve() + "/src/Views");
    app.use(express.static(path.resolve() + '/src/Public'));

    app.use(session({
        secret: 'Some secret',
        store: MongoStore.create({
            mongoUrl: mongoURI
        }),
        cookie: {
            maxAge: 60000 * 60 * 24
        },
        saveUninitialized: false,
        resave: false,
        name: 'Discord OAuth'
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
          done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        if(user) done(null, user);
    });
    passport.use(discordStrategy);

    app.use("/", routes.router);

    connectWithMongoDB();

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => {
        console.log(`Server lift off on port: ${port}`);
    });
}
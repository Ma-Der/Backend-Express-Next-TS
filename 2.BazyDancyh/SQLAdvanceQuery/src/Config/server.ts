import { port } from './envVar';
import express, { Express } from 'express';
import routes from '../Routes/router';
import { fillUsersDb, fillNationsDB } from '../Utils/dbFiller';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/", routes.router);
    // fillUsersDb()
    // .then(() => {})
    // .catch(err => console.log(err));

    // fillNationsDB()
    // .then(()=>{})
    // .catch(err => console.log(err));

    startServer(app);
    return app;
}

const startServer = (app: Express) => {
    app.listen(port, () => console.log(`Server started on port: ${port}`));
}
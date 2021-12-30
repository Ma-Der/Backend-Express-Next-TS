import express, { Express } from 'express';
import { port } from './envVar';
import { connectWithMongoDB } from '../db/Mongo/mongoConnection';
import mealRoutes from '../Routes/routes';
import { clearDBs, insertMealsInDbs } from '../Services/dbOperations';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/", mealRoutes.router);
    
    connectWithMongoDB();
    clearDBs();
    startServer(app);
    insertMealsInDbs()
    .then(() => {})
    .catch(err => err);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => console.log(`Server started on port: ${port}`));
}
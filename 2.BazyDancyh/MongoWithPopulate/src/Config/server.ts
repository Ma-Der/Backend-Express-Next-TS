import express, { Express } from 'express';
import schoolRoutes from '../Routes/schoolRoutes';
import classRoutes from '../Routes/classRoutes';
import studentRoutes from '../Routes/studentRoutes';
import { port } from './envVar';
import { connectWithMongoDB } from '../db/Mongo/mongoConnection';
import { Creation } from '../Utils/Creation';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());

    app.use("/school", schoolRoutes.router);
    app.use("/class", classRoutes.router);
    app.use("/student", studentRoutes.router);

    connectWithMongoDB();

    Creation.createSchool()
    .then(res => res.populate('classes'))
    .then(response => console.log(response))
    .catch(err => console.log(err));

    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(port, () => console.log(`Server started on port: ${port}`));
}
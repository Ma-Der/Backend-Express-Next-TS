import express, { Express } from 'express';
import imageRoutes from '../Routes/routes';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
const xss = require('xss-clean');

dotenv.config();

export const initializeImageServer = (): Express => {
    const app = express();
    
    app.use(helmet());
    
    const limit1 = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 100,
        message: "Too many requests"
    });

    const limit2 = rateLimit({
        max: 200,
        windowMs: 60 * 60 * 100,
        message: "Too many requests"
    });

    app.use("/getFirstImage", limit1);
    app.use("/getSecondImage", limit2);

    app.use(express.json({limit: '30kb'}));

    app.use("/", imageRoutes.router);

    app.use(xss());
    
    startServer(app);
    return app;
}

const startServer = (server: Express) => {
    server.listen(process.env.PORT_IMAGE, () => {
        console.log(`Server image on ${process.env.PORT_IMAGE}`);
    });
}
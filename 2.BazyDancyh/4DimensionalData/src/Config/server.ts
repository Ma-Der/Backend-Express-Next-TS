import { port } from './envVar';
import express, { Express } from 'express';
import storesChainRoutes from '../Routes/StoresChainRouter';
import shopRoutes from '../Routes/ShopRouter';
import categoryRoutes from '../Routes/CategoryRouter';
import productRoutes from '../Routes/ProductRouter';

export const initializeServer = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use("/storesChain", storesChainRoutes.router);
    app.use("/shop", shopRoutes.router);
    app.use("/category", categoryRoutes.router);
    app.use("/product", productRoutes.router);

    startServer(app);
    return app;
}

const startServer = (app: Express) => {
    app.listen(port, () => console.log(`Server started on port: ${port}`));
}
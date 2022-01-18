import { Request, Response } from 'express';
import { StoresChainHandler } from '../Handlers/StoresChainHandler';
import { IStoreChain, StoreChainProperty } from '../Types/types';
import { storeChainSchema, storeChainPropertySchema, idSchema, storeChainPropertyValueSchema } from '../Validation/validationSchema';

export class StoresChainController {
    public static async getStoresChains(req: Request, res: Response) {
        try {
            const storeChains = await StoresChainHandler.getStoreChains();

            return res.status(200).json(storeChains);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async getStoresChain(req: Request<{id: string}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);

            const { id } = req.params;
            const storeChain = await StoresChainHandler.getStoreChain(parseInt(id));

            return res.status(200).json(storeChain);
        }
        catch(err: any) {
            return res.status(404).json(err.message);
        }
    }

    public static async createStoresChain(req: Request<{}, {}, {storeChainData: IStoreChain}>, res: Response) {
        try {
            const validationResult = await storeChainSchema.validateAsync(req.body.storeChainData);
            console.log(validationResult);

            const { name, owner } = req.body.storeChainData;

            const newStoreChain = await StoresChainHandler.createStoreChain(name, owner);

            return res.status(201).json(newStoreChain);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeStoresChainProperty(req: Request<{id: string}, {}, {storeChainProperty: StoreChainProperty, newPropertyValue: string}>, res: Response) {
        try {

            const validationIdResult = await idSchema.validateAsync(req.params);
            const validationPropertyResult = await storeChainPropertySchema.validateAsync(req.body.storeChainProperty);
            const validationPropertyValueResult = await storeChainPropertyValueSchema.validateAsync(req.body.newPropertyValue);

            const { id } = req.params;
            const { storeChainProperty, newPropertyValue } = req.body;

            const updateStoreChain = await StoresChainHandler.changeStoreChainProperty(parseInt(id), storeChainProperty, newPropertyValue);

            return res.status(200).json(updateStoreChain);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteStoresChain(req: Request<{id: string}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
            console.log(validationResult);

            const { id } = req.params;

            const deleteStoreChain = await StoresChainHandler.deleteStoreChain(parseInt(id));

            return res.status(204).json(deleteStoreChain);
        }
        catch(err: any) {
            return res.status(400).json(err.message);
        }
    }
}
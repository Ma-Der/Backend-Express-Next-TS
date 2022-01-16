import { Request, Response } from 'express';
import { StoresChainHandler } from '../Handlers/StoresChainHandler';
import { IStoreChain, StoreChainProperty } from '../Types/types';
import { storeChainSchema, storeChainPropertySchema, idSchema } from '../Validation/validationSchema';

export class StoresChainController {
    public static async getStoresChains(req: Request, res: Response) {
        try {
            const storeChains = await StoresChainHandler.getStoreChains();

            return res.status(200).json(storeChains);
        }
        catch(err) {
            return res.status(404).json(err.message);
        }
    }

    public static async getStoresChain(req: Request<{id: number}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
            console.log(validationResult);

            const { id } = req.params;
            if(typeof id !== 'number') {
                const parsedId = parseInt(id);
                const storeChain = await StoresChainHandler.getStoreChain(parsedId);
                
                return res.status(200).json(storeChain);
            } 

            const storeChain = await StoresChainHandler.getStoreChain(id);

            return res.status(200).json(storeChain);
        }
        catch(err) {
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
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async changeStoresChainProperty(req: Request<{id: number}, {}, {storeChainProperty: StoreChainProperty, newPropertyValue: string}>, res: Response) {
        try {

            const validationResult = await storeChainPropertySchema.validateAsync(req.body.storeChainProperty);
            console.log(validationResult);

            const validationIdResult = await idSchema.validateAsync(req.params);
            console.log(validationIdResult);

            const { id } = req.params;
            const { storeChainProperty, newPropertyValue } = req.body;

            if(typeof id !== 'number') {
                const parsedId = parseInt(id);
                const updateStoreChain = await StoresChainHandler.changeStoreChainProperty(parsedId, storeChainProperty, newPropertyValue);
                
                return res.status(200).json(updateStoreChain);
            } 

            const updateStoreChain = await StoresChainHandler.changeStoreChainProperty(id, storeChainProperty, newPropertyValue);

            return res.status(200).json(updateStoreChain);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }

    public static async deleteStoresChain(req: Request<{id: number}>, res: Response) {
        try {
            const validationResult = await idSchema.validateAsync(req.params);
            console.log(validationResult);

            const { id } = req.params;

            if(typeof id !== 'number') {
                const parsedId = parseInt(id);
                const deleteStoreChain = await StoresChainHandler.deleteStoreChain(parsedId);
                
                return res.status(204).json(deleteStoreChain);
            } 

            const deleteStoreChain = await StoresChainHandler.deleteStoreChain(id);

            return res.status(204).json(deleteStoreChain);
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}
import { Response } from 'express';
import { IResponseData } from '../Types/responseProcessorTypes';

export class ResponseProcessor {
    private static endWithSuccess(res: Response, responseData: IResponseData) {
        return res.status(responseData.status).json({message: responseData.message, values: responseData.values, error: false});
    }   

    private static endWithError(res: Response, responseData: IResponseData) {
        return res.status(responseData.status).json({message: responseData.message, error: true});
    }

    public static endResponse(res: Response, responseData: IResponseData) {
        if(!responseData.error) {
            return this.endWithSuccess(res, responseData);
        }
        return this.endWithError(res, responseData);
    }
}
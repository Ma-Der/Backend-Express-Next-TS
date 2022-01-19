import { Response } from 'express';
import { IResponseData } from '../Types/responseProcessorTypes';

export class ResponseProcessor {
    public static endWithSuccess(res: Response, responseData: IResponseData) {
        return res.status(responseData.status).json({message: responseData.message, values: responseData.values, error: false});
    }   

    public static endWithError(res: Response, responseData: IResponseData) {
        return res.status(responseData.status).json({message: responseData.message, error: true});
    }
}
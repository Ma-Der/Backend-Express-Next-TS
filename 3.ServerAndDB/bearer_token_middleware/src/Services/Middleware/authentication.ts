import { RequestHandler, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../../Config/envVar';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader) return res.status(401);
    const token = authorizationHeader.split(' ')[1];
    if(!token) return res.status(401);
    
    try {
        const verified = jwt.verify(token, accessTokenSecret);
        if(!verified) return res.status(403);
        next();
    }
    catch(err: any) {
        return res.status(401).json();
    }
    
}
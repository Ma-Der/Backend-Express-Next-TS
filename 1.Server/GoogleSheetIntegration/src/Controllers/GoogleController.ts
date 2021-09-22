import { Request, Response } from 'express';
import { GoogleHandler } from '../Handlers/GoogleHandler';
import { spreadsheetId } from '../Config/envVariables';
import path from 'path';

export class GoogleController {

    public static async upload(req: Request, res: Response) {
        try {
            const fileName = req.file?.filename;
            const mimeType = req.file?.mimetype;
            const filePath = req.file?.path;
            const { name, surname, email } = req.body;  
            const { oAuth2Client, googleSpreadsheetAuth, googleSheets } = await GoogleHandler.googleVariables();          
                   

            if(!(fileName && mimeType && filePath)) throw new Error("There is no file to upload.");

            const mediaData = await GoogleHandler.createMediaData(mimeType, filePath);

            const googleDrive = await GoogleHandler.getGoogleDriveWithCredentials(oAuth2Client);
           
            const uploadedFile = await GoogleHandler.uploadFileToGoogleDrive(googleDrive, fileName, mimeType, mediaData);
            
            const fileId = uploadedFile.data.id;
            if(!fileId) throw new Error("File does not exist.");

            const drivePermissions = await GoogleHandler.createDrivePermissions(googleDrive, fileId);
            
            const fileDownloadLink = await GoogleHandler.createGoogleDriveDownloadLink(googleDrive, fileId);

            const ipAddress = GoogleHandler.getIp();
            const downloadLink = fileDownloadLink.data.webContentLink as string;

            const appendedToSheet = await GoogleHandler.appendToGoogleSheet(googleSheets, googleSpreadsheetAuth, spreadsheetId, name, surname, email, ipAddress, downloadLink);

            GoogleHandler.deleteUploads(filePath);

            return res.status(200).render(path.join(path.resolve(), 'src', 'views', 'uploaded'));
            
        }
        catch(err) {
            return res.status(400).json(err.message);
        }

    }

    public static async getOAuthCredentials(req: Request<{}, {}, {}, {code: string}>, res: Response) {
        try {
            const { code } = req.query;
            const { oAuth2Client } = await GoogleHandler.googleVariables();

            const credentials = await GoogleHandler.getOAuthCredentials(oAuth2Client, code);

            return res.status(200).render('form');
        }
        catch(err) {
            return res.status(400).json(err);
        }
    }
}
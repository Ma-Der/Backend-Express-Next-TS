import { Request, Response } from 'express';
import { GoogleHandler } from '../Handlers/GoogleHandler';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, credentials, spreadsheetId } from '../Config/envVariables';
import path from 'path';

export class GoogleController {

    static oAuth2Client = GoogleHandler.getGoogleOAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    public static async upload(req: Request, res: Response) {
        try {
            const fileName = req.file?.filename;
            const mimeType = req.file?.mimetype;
            const filePath = req.file?.path;
            const file = req.file;
            const { name, surname, email } = req.body;            
        
            if(!(fileName && mimeType && filePath)) throw new Error("There is no file to upload.");

            const googleDrive = await GoogleHandler.getGoogleDrive(this.oAuth2Client);
            const mediaData = await GoogleHandler.createMediaData(mimeType, filePath);
            
            const uploadedFile = await GoogleHandler.uploadFileToGoogleDrive(googleDrive, fileName, mimeType, mediaData);

            const drivePermissions = await GoogleHandler.createDrivePermissions(googleDrive, file);
            const fileDownloadLink = await GoogleHandler.createGoogleDriveDownloadLink(googleDrive, file);

            const googleSpreadsheetAuth = await GoogleHandler.getSpreadsheetAuth(credentials);
            const googleSheetClient = await GoogleHandler.getSpreadsheetClient(googleSpreadsheetAuth);
            const googleSheets = await GoogleHandler.getGoogleSheets(googleSheetClient);
            const ipAddress = GoogleHandler.getIp();

            const downloadLink = fileDownloadLink.data.webContentLink as string;
            const appendedToSheet = await GoogleHandler.appendToGoogleSheet(googleSheets, googleSpreadsheetAuth, spreadsheetId, name, surname, email, ipAddress, downloadLink);
            console.log(appendedToSheet.data);

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
            console.log(req.query)
            
            const credentials = await GoogleHandler.getOAuthCredentials(this.oAuth2Client, code);

            return res.status(200).render('form');
        }
        catch(err) {
            return res.status(400).json(err.message);
        }
    }
}
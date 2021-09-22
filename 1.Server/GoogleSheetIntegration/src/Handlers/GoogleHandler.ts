import { google, Auth, drive_v3, sheets_v4 } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, credentials } from '../Config/envVariables';

type Media = {
    mimeType: string;
    body: fs.ReadStream;
}

export class GoogleHandler {
    public static async googleVariables() {
        const oAuth2Client = await GoogleHandler.getGoogleOAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        const googleDrive = await GoogleHandler.getGoogleDrive(oAuth2Client);
        const googleSpreadsheetAuth = await GoogleHandler.getSpreadsheetAuth(credentials);
        const googleSheetClient = await GoogleHandler.getSpreadsheetClient(googleSpreadsheetAuth);
        const googleSheets = await GoogleHandler.getGoogleSheets(googleSheetClient);

        return {
            oAuth2Client,
            googleDrive,
            googleSpreadsheetAuth,
            googleSheets
        }
    }

    public static async getGoogleDriveWithCredentials(oAuth2Client: Auth.OAuth2Client) {

        const token = fs.readFileSync(path.join(path.resolve(), 'src', 'tokens', 'tokens.tk'), 'utf8');
        const parsedToken = JSON.parse(token);
        oAuth2Client.setCredentials(parsedToken);
        const googleDrive = await this.getGoogleDrive(oAuth2Client);

        return googleDrive;        
    }

    public static async getGoogleOAuth2Client(clientId: string, clientSecret: string, redirectURI: string) {
        const oAuth2 = await new google.auth.OAuth2(clientId, clientSecret, redirectURI);
        return oAuth2;
    }

    public static async getGoogleDrive(oAuth2Client: Auth.OAuth2Client) {
        return await google.drive({
            version: 'v3',
            auth: oAuth2Client
        });
    }

    public static async getOAuthCredentials(oAuth2Client: Auth.OAuth2Client, code: string) {
        const token = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(token.tokens);
        
        fs.writeFileSync(path.join(path.resolve(), 'src', 'tokens', 'tokens.tk'), JSON.stringify(token.tokens));
        
        return oAuth2Client;
    }

    public static getSpreadsheetAuth(credentials: string): any {
        return new GoogleAuth({
            keyFilename: credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });
    }

    public static async getSpreadsheetClient(auth: Auth.GoogleAuth) {
        return await auth.getClient();
    }

    public static getGoogleSheets(client: Auth.BaseExternalAccountClient | Auth.Compute | Auth.JWT | Auth.UserRefreshClient) {
        return google.sheets({version: "v4", auth: client});
    }

    public static createMediaData(mimeType: string, filePath: string) {
        return {
            mimeType: mimeType,
            body: fs.createReadStream(filePath)
        }
    }

    public static async uploadFileToGoogleDrive(drive: drive_v3.Drive, name: string, mimeType: string, media: Media) {     
        
        const response = await drive.files.create({
            requestBody: {
                name: name,
                mimeType: mimeType
            },
            media: media
        });

        return response;
    }

    public static async createDrivePermissions(drive: drive_v3.Drive, fileId: string) {
        return await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
    }

    public static async createGoogleDriveDownloadLink(drive: drive_v3.Drive, fileId: string) {
        return await drive.files.get({
            fileId: fileId,
            fields: 'webContentLink'
        })
    }

    
    public static async appendToGoogleSheet(googleSheets: sheets_v4.Sheets, auth: Auth.GoogleAuth, spreadsheetId: string, name: string, surname: string, email: string, ip: string, downloadLink: string) {
        const request = {
            auth: auth,
            spreadsheetId: spreadsheetId, 
            range: "Arkusz1!A:G",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[uuidv4(), Date.now(), name, surname, email, ip, downloadLink]]
            }
        } 
        
        const appended = await googleSheets.spreadsheets.values.append(request);

        return appended;
    }

    public static getIp() {
        const osNetwork = os.networkInterfaces();
        if(!osNetwork) throw new Error("osNetwwork is undefined.");

        const ipAddress = osNetwork[Object.keys(osNetwork)[0]][1].address;
        return ipAddress;
    }

    public static deleteUploads(filePath: string) {
        fs.unlinkSync(filePath);
    }

    public static async generateAuthUrl(oAuth2Client: Auth.OAuth2Client, scopes: string) {
        return await oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
    }
    
}
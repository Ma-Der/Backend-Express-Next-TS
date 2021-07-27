import { google, Auth, drive_v3, sheets_v4 } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as os from 'os';

type Media = {
    mimeType: string;
    body: fs.ReadStream;
}

export class GoogleHandler {

    public static getGoogleOAuth2Client(clientId: string, clientSecret: string, redirectURI: string) {
        return new google.auth.OAuth2(clientId, clientSecret, redirectURI);
    }

    public static getGoogleDrive(oAuth2Client: Auth.OAuth2Client) {
        return google.drive({
            version: 'v3',
            auth: oAuth2Client
        });
    }

    // Jakie typy na err i tokens ???
    public static async getOAuthCredentials(oAuth2Client: Auth.OAuth2Client, code: string) {
        return await oAuth2Client.getToken(code, (err: any, tokens: any) => {

            if(err) throw new Error('Error in authenticating.');
            
            oAuth2Client.setCredentials(tokens);
        })
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

// file jaki typ ??
    public static async createDrivePermissions(drive: drive_v3.Drive, file: any) {
        return await drive.permissions.create({
            fileId: file.data.id,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
    }

    public static async createGoogleDriveDownloadLink(drive: drive_v3.Drive, file: any) {
        return await drive.files.get({
            fileId: file.data.id,
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
import express from 'express';
import {Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';

const {google} = require("googleapis");
const {GoogleAuth} = require('google-auth-library');
const os = require('os');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const auth = new GoogleAuth({
    keyFilename: process.env.CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
}); 

const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client
})
const Storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, './uploads')
    },
    filename: (req: Request, file: any, cb: Function) => {
        cb(null, file.fieldname + "_" + file.originalname)
    }
})

const upload = multer({ storage: Storage }).single('file');

router.get('/upload', (req, res) => {
    try {
        const code = req.query.code;
        if (!code) throw new Error('Something went wrong');
    
        oAuth2Client.getToken(code, (err: Error, tokens: any) => {
            if (err) throw new Error('Error in authenticating')
    
            oAuth2Client.setCredentials(tokens);
            res.redirect('/form');
        })
    }
    catch(err) {
        console.log('Error occured: ' + err.message)
    }
    
})
router.post('/upload', async (req: Request, res: Response) => {
    try {
        const client = await auth.getClient();
        const googleSheets = google.sheets({version: "v4", auth: client});   
        const spreadsheetId = process.env.SHEET_ID;
        const ip = os.networkInterfaces();
        const ipAddress = ip[Object.keys(ip)[0]][1].address;

        upload(req, res, (err: Error) => {
            if (err) throw err;

            const fileMetaData = {
                name: req.file.filename
            }
            const media = {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(req.file.path)
            }
    
            drive.files.create({
                resource: fileMetaData,
                media,
                fields: "id"
            }, async (err: Error, file: any) => {
                try{
                    await drive.permissions.create({
                        fileId: file.data.id,
                        requestBody: {
                            role: "reader",
                            type: "anyone"
                        }
                    })
                    
                    const downloadLink = await drive.files.get({
                        fileId: file.data.id,
                        fields: 'webContentLink'
                    })
    
                    googleSheets.spreadsheets.values.append({
                        auth,
                        spreadsheetId,
                        range: "Arkusz1!A:G",
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [[uuidv4(), Date.now(),req.body.name, req.body.surname, req.body.email, ipAddress, downloadLink.data.webContentLink]]
                        }
                    });
                    fs.unlinkSync(req.file.path);
                }
                catch(err) {
                    if(err) throw new Error('Something went wrong with uploading to google drive.'+ err.message);
                }
                


            })
        })
        res.render(path.join(path.resolve(), 'src', 'views', 'uploaded'))
        res.end();
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router;
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 1337;
const sheet = require("./routes/sheet");
const path = require('path');
const {google} = require("googleapis");

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const SCOPES = "https://www.googleapis.com/auth/drive.file"

const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
})

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve() + '/src/public'));


app.get('/', (req, res) => {
    res.render(path.join(path.resolve(), 'src', 'views', 'index'), {url: url});
});

app.get('/form', (req,res) => {
    res.render(path.join(path.resolve(), 'src', 'views', 'form'));
});
app.use(sheet);


app.listen(port, () => console.log(`Running on port: ${port}`))
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { port } from './utils/envVariables';
import { socket } from './socket/socket';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

app.get("/", (_, res) => {
    res.send("Server is up and running.");
})

httpServer.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    socket({ io });
})
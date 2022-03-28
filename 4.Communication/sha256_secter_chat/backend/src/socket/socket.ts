import { Server, Socket } from "socket.io";
import { EVENTS } from './events';

type SocketIO = {
    io: Server;
}

export const socket = ({io}: SocketIO) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(`hello ${socket.id}`)
    });
}
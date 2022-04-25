import { nanoid } from 'nanoid';
import { Server, Socket } from "socket.io";
import { EVENTS } from './events';

type SocketIO = {
    io: Server;
}

const rooms: Record<string, { name: string }> = {}

export const socket = ({io}: SocketIO) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(`hello ${socket.id}`)

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
            const roomId = nanoid();
            rooms[roomId] = {
                name: roomName
            };

            socket.join(roomId);
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });

        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({roomId, message, username}) => {
            const date = new Date()
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
            });
        });

    });
}
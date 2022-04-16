import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/config';

interface Context {
    socket: Socket;
    username?: string;
    setUsername: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({ socket, setUsername: () => false });
export const useSockets = () => useContext(SocketContext);

const SocketProvider = (props: any) => {

    const [username, setUsername] = useState("");
    const [rooms, setRooms] = useState("");
    return (
        <SocketContext.Provider value={{socket, username, setUsername}} {...props}/>
    );
}

export default SocketProvider;
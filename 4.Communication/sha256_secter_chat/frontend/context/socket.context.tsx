import { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config/config';

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });
export const useSockets = () => useContext(SocketContext);

const SocketProvider = (props: any) => {
    return (
        <SocketContext.Provider value={{socket}} {...props}/>
    );
}

export default SocketProvider;
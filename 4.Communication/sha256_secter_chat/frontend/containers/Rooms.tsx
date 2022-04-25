import { useSockets } from "../context/socket.context";
import { useRef, useState } from "react";
import EVENTS from "../config/events";

const RoomsContainer = () => {
    const { socket, rooms, roomId } = useSockets();
    const newRoomRef = useRef<HTMLInputElement>(null);
    const [roomsInputText, setRoomsInputText] = useState("");

    function handleCreateRoom() {
        const roomName = newRoomRef.current?.value || '';

        if(!String(roomName).trim()) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

        setRoomsInputText("");
    }
    return (
        <nav>
            <div>
                <input value={roomsInputText} placeholder="Room name" ref={newRoomRef} onChange={ (e) => setRoomsInputText(e.target.value)}/>
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>
            {Object.keys(rooms).map((key: string, i) => {
                return <div key={key}>{key}</div>;
            })}
        </nav>
    )
}

export default RoomsContainer;
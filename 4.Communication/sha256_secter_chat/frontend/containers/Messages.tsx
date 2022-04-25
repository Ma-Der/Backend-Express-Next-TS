import { useSockets } from "../context/socket.context";
import { useRef } from 'react';
import EVENTS from "../config/events";

const MessagesContainer = () => {
    const { socket, messages, roomId, username, setMessages } = useSockets();
    const newMessageRef = useRef<HTMLTextAreaElement>(null);

    function handleSendMessage() {
        const message = newMessageRef.current?.value;

        if(!String(message).trim()) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

        const date = new Date()
        if(!messages) return;
        setMessages([...messages, {
            username: 'You',
            message,
            time: `${date.getHours()}:${date.getMinutes()}`,
        }]);
    }

    if(!roomId) {
        return <div />;
    }

    return (
        <div>
            {messages?.map(({message, username, time}, i) => {
                return <p key={i}>{message}</p>
            })}

            <div>
                <textarea
                rows={1}
                placeholder='Message...'
                ref={newMessageRef}
                />
                <button onClick={handleSendMessage}>Send message</button>
            </div>
        </div>
    )
}

export default MessagesContainer;
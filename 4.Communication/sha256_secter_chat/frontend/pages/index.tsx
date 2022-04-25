import { useSockets } from '../context/socket.context';
import { useRef } from 'react';
import RoomsContainer from '../containers/Rooms';
import MessagesContainer from '../containers/Messages';

const Home = () => {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleSetUsername() {
    const value = usernameRef.current?.value;
    
    if(!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem("username", value);
  }
  

  return (
    <div>
      {!username && (
        <div>
          <div>
            <input placeholder='Username' ref={usernameRef} />
            <button onClick={handleSetUsername}>Get into chat</button>  
          </div>
        </div>

      )}
      
      {username && (
        <div>
          <RoomsContainer />
          <MessagesContainer />  
        </div>
      )}


    </div>
  )
}

export default Home

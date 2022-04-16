import type { NextPage } from 'next'
import SocketProvider, { useSockets } from '../context/socket.context'
import RoomsContainer from '../containers/Rooms';
import MessagesContainer from '../containers/Messages';

const Home: NextPage = () => {
  const { socket, username, setUsername } = useSockets();
  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />


    </div>
  )
}

export default Home

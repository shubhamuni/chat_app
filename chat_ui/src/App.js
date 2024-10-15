import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import io from 'socket.io-client';

const socket = io.connect('https://chat-build.onrender.com');


  // Make sure this matches the actual server address and port

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/chat' element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;

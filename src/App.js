import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './components/Homepage';
import Nav from './components/Nav'
 
function App() {
  const [socket] = useState(() => io(':8000'))
  const[username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)
 
  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true)
    });

    return () => {
    socket.disconnect(true)}
  }, []);
 
  return (
    <div className="App">
      <Nav/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Chat socket={socket} username={username} setUsername={setUsername}/>}/>
          <Route path='/homepage' element={<Homepage socket={socket} username={username} setUsername={setUsername}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;


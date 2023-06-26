import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Chat = (props) => {
  const navigate = useNavigate()
  const {socket, username, setUsername} = props

  const joinServer = (e) => {
    e.preventDefault()
    socket.emit('join-server', username)
    navigate('/homepage')
  }
  return (
    <div style={{width: "475px", margin: "20px", padding: "20px", textAlign: "center", border: "2px solid black"}}>
      <h2>Get started right now!</h2>
      <br/>
      <p>I want to start chatting with the name...</p>
      <br/>
      <form onSubmit={joinServer} >
        <input style={{width: "200px", margin: "10px", padding: 
      "5px", border: "2px solid black"}} type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <button style={{padding: "5px", backgroundColor: "#aae8d8"}}>Start Chatting</button>
      </form>

    </div>
  )
}

export default Chat
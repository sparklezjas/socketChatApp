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
    <div>
      <h2>Sign in with a username to join our server</h2>
      <form onSubmit={joinServer}>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <button>Join</button>
      </form>

    </div>
  )
}

export default Chat
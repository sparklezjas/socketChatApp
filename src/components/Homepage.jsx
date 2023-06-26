import React, { useState, useEffect } from 'react'

const Homepage = (props) => {
  const { socket, username, setUsername } = props
  const [users, setUsers] = useState([])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [chatHistory, setChatHistory] = useState([])

  useEffect(() => {
    socket.on('new-user-joined', (data) => {
      console.log(data)
      setUsers(data)
    })
    socket.on('send-message-to-all-clients', (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
    })
    socket.on('chat-history', (history) => {
      setChatHistory(history)
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send-message', { message: input, username: username })
    setInput('')
  };

  return (
    <div
      style={{
        width: '475px',
        margin: '20px',
        padding: '20px',
        textAlign: 'center',
        border: '2px solid black',
      }}
    >
      <h3>Users in the chat</h3>
      {users.map((user) => (
        <p key={user.id}>username: {user.username}</p>
      ))}
      {chatHistory.map((message) => (
        <div
          key={message.id}
          style={{
            backgroundColor: message.username === username ? '#ffeeba' : '#d4edda',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
          }}
        >
          {message.username} says: {message.message}
        </div>
      ))}
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            backgroundColor: message.username === username ? '#ffeeba' : '#d4edda',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
          }}
        >
          {message.username} says: {message.message}
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          style={{
            width: '200px',
            margin: '10px',
            padding: '5px',
            border: '2px solid black',
          }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={{ padding: '5px', backgroundColor: '#aae8d8' }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Homepage;

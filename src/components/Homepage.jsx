import React, {useState, useEffect} from 'react'

const Homepage = (props) => {
    const {socket, username, setUsername} = props
    const [users, setUsers] = useState([])
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

useEffect(() => {
    socket.on('new-user-joined', data => {
        console.log(data)
        setUsers(data)
    })
    socket.on('send-message-to-all-clients', data => {
        setMessages((prevMessages) => [...prevMessages, data])
    })
}, [])
const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send-message', {message:input, username: username})
    setInput('')
}

  return (
    <div>
        <h2>Users in the chat</h2>
        {
            users.map((user) => (
                <p key={user.id}>username: {user.username}</p>
            ))
        }
      <form onSubmit={sendMessage}>
        <label>Message:</label>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <button>Send Message</button>
      </form>
      {
        messages.map((message) => (
            <div>{message.username} Says: {message.message}</div>
        ))
      }
    </div>
  )
}

export default Homepage
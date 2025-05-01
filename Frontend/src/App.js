// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// function App() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [typingStatus, setTypingStatus] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     socket.on('receiveMessage', (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     socket.on('typing', (data) => {
//       setTypingStatus(data ? `${data} is typing...` : '');
//     });

//     fetch('http://localhost:5000/history')
//       .then((res) => res.json())
//       .then((data) => setChat(data));
//   }, []);

//   const handleLogin = () => {
//     if (username.trim()) {
//       socket.emit('login', username);
//       setLoggedIn(true);
//     }
//   };

//   const handleSend = () => {
//     if (message.trim()) {
//       const msgData = {
//         username,
//         text: message,
//         time: new Date().toLocaleTimeString()
//       };
//       socket.emit('sendMessage', msgData);
//       setMessage('');
//       setIsTyping(false);
//     }
//   };

//   const handleTyping = (e) => {
//     setMessage(e.target.value);
//     if (!isTyping) {
//       setIsTyping(true);
//       socket.emit('typing', username);
//     }
//     setTimeout(() => {
//       setIsTyping(false);
//       socket.emit('typing', '');
//     }, 2000);
//   };

//   if (!loggedIn) {
//     return (
//       <div className="login-container">
//         <h2>Enter Username</h2>
//         <input
//           type="text"
//           placeholder="Your name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button onClick={handleLogin}>Join Chat</button>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         <h2>Chat Room</h2>
//         <div className="chat-messages">
//           {chat.map((msg, index) => (
//             <div
//               key={index}
//               className={`chat-message ${msg.username === username ? 'own' : ''}`}
//             >
//               <strong>{msg.username}</strong>: {msg.text} <span>({msg.time})</span>
//             </div>
//           ))}
//         </div>
//         <p className="typing">{typingStatus}</p>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={handleTyping}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Connect to the backend socket server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Event listeners
    newSocket.on('receiveMessage', (data) => {
      setChat((prev) => [...prev, data]);
    });

    newSocket.on('typing', (data) => {
      setTypingStatus(data ? `${data} is typing...` : '');
    });

    // Load previous chat history from backend
    fetch('http://localhost:5000/history')
      .then((res) => res.json())
      .then((data) => setChat(data))
      .catch((err) => console.error('Failed to fetch history:', err));

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLogin = () => {
    if (username.trim() && socket) {
      socket.emit('login', username);
      setLoggedIn(true);
    }
  };

  const handleSend = () => {
    if (message.trim() && socket) {
      const msgData = {
        username,
        text: message,
        time: new Date().toLocaleTimeString()
      };
      socket.emit('sendMessage', msgData);
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping && socket) {
      setIsTyping(true);
      socket.emit('typing', username);
    }
    setTimeout(() => {
      if (socket) {
        setIsTyping(false);
        socket.emit('typing', '');
      }
    }, 2000);
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Enter Username</h2>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>Chat Room</h2>
        <div className="chat-messages">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.username === username ? 'own' : ''}`}
            >
              <strong>{msg.username}</strong>: {msg.text} <span>({msg.time})</span>
            </div>
          ))}
        </div>
        <p className="typing">{typingStatus}</p>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;


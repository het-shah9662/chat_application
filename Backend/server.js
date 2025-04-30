const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const { addUser, removeUser, getUsers } = require('./models/userModel');
const { addMessage, getAllMessages } = require('./models/messageModel');

const app = express();
//app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // React frontend
  methods: ['GET', 'POST'],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// WebSocket logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('login', async (username) => {
    try {
      await addUser(username, socket.id);
      const users = await getUsers();
      io.emit('userList', users);
    } catch (err) {
      console.error('Login error:', err.message);
    }
  });

  socket.on('sendMessage', async (messageData) => {
    try {
      await addMessage(messageData.username, messageData.text, messageData.time);
      io.emit('receiveMessage', messageData);
    } catch (err) {
      console.error('Message sending error:', err.message);
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', async () => {
    try {
      await removeUser(socket.id);
      const users = await getUsers();
      io.emit('userList', users);
      console.log('User disconnected:', socket.id);
    } catch (err) {
      console.error('Disconnection error:', err.message);
    }
  });
});

// HTTP route for chat history
app.get('/history', async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

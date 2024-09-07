const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const { useAzureSocketIO } = require('@azure/web-pubsub-socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server);


useAzureSocketIO(io, {
  hub: "Hub", 
  connectionString: "",
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', async (socket) => {
  console.log('a user connected');

  await socket.join("room abc");

  socket.on('join room', ({ nickname, room }) => {
    if (socket.currentRoom) {
      socket.leave(socket.currentRoom);
      io.to(socket.currentRoom).emit('room message', `${nickname} has left the room`);
    }
    socket.join(room);
    socket.currentRoom = room;
    socket.nickname = nickname;
    console.log(`${nickname} joined room: ${room}`);
    io.to(room).emit('room message', `${nickname} has joined the room`);
  });

  socket.on('room message', ({ room, msg }) => {
    io.to(room).emit('room message', msg);
  });

  socket.on('disconnect', () => {
    if (socket.currentRoom) {
      io.to(socket.currentRoom).emit('room message', `${socket.nickname} has left the room`);
    }
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

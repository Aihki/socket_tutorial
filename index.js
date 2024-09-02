'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Join a room
  socket.on('join room', ({ nickname, room }) => {
    if (socket.currentRoom) {
      socket.leave(socket.currentRoom);
      io.to(socket.currentRoom).emit('room message', `${nickname} has left the room`);
    }
    socket.join(room);
    socket.currentRoom = room;
    socket.nickname = nickname;
    console.log(`${nickname} joined room: ${room}`);
    // Notify the room that a new user has joined
    io.to(room).emit('room message', `${nickname} has joined the room`);
  });

  // Broadcast to a specific room, including the sender
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

server.listen(3000, () => {
  console.log('listening on *:3000');
});

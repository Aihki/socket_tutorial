import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js';

const webPubSubEndpoint = "https://schoolwork.webpubsub.azure.com";
const socket = io(webPubSubEndpoint, {
  path: "/clients/socketio/hubs/Hub",
  transports: ["websocket"],
});

console.log('Connecting to WebSocket:', webPubSubEndpoint);

socket.on('connect', () => {
  console.log('WebSocket is connected');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('WebSocket disconnected:', reason);
});

socket.on('reconnect_attempt', () => {
  console.log('WebSocket reconnect attempt');
});

socket.on('reconnect_failed', () => {
  console.error('WebSocket reconnect failed');
});

document.addEventListener('DOMContentLoaded', () => {
  const roomSelect = document.getElementById('room');
  const rooms = ['Music', 'Literature', 'Sports', 'Random'];

  rooms.forEach(room => {
      const option = document.createElement('option');
      option.value = room;
      option.textContent = room;
      roomSelect.appendChild(option);
  });
});

document.getElementById('enter-chat').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value;
  if (nickname) {
    document.getElementById('nickname-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
    document.getElementById('nickname').dataset.nickname = nickname;
  }
});

document.getElementById('join-room').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').dataset.nickname;
  const room = document.getElementById('room').value;
  if (nickname && room) {
    socket.emit('join room', { nickname, room });
    document.getElementById('messages').innerHTML = '';
  }
});

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('input');
  const room = document.getElementById('room').value;
  const nickname = document.getElementById('nickname').dataset.nickname;
  if (input.value && room && nickname) {
    const message = `${nickname} says: ${input.value}`;
    socket.emit('room message', { room, msg: message });
    input.value = '';
  }
});

socket.on('room message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
});
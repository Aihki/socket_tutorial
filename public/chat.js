const socket = io();

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
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000'); // URL of your Flask server

export default socket;
import { io } from 'socket.io-client';

const url = process.env.URL;

const socket = io(url);

export default socket;

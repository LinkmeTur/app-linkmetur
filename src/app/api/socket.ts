import { io } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_API_URL;

const socket = io(url);

export default socket;

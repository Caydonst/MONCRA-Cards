// client/src/socket.js
import { io } from "socket.io-client";

// Use your backend URL (localhost during development)
const socket = io("http://localhost:3001");

export default socket;

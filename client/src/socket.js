// client/src/socket.js
import { io } from "socket.io-client";

// Use your backend URL (localhost during development)
const socket = io("http://10.1.17.129:3001");

export default socket;

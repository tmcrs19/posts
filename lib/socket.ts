import { io } from "socket.io-client";

const socket = io("https://localhost:3000");

export default socket;

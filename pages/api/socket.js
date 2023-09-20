import { io } from "socket.io-client";  //import socket io
const socket = io("http://localhost:3000"); //initalize the socket io
export default socket;

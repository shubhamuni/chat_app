import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const onlineUsers = {};

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-17cu.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
const getReceiverSocketId = (receiverId) => {
    if (onlineUsers[receiverId]) {
        return onlineUsers[receiverId];
    } else {
        console.log("Receiver is not online");
        return null;
    }
}

io.on('connection', (socket) => {
    console.log("user joined", socket.id);
    socket.on('join', (receiverId) => {
        onlineUsers[receiverId] = socket.id;
        console.log("Receiver ID: ", receiverId, " Socket id: ", socket.id, "online users", onlineUsers);
        socket.emit('joinSuccess', { receiverId });
    });
});

export { app, server, io, getReceiverSocketId };

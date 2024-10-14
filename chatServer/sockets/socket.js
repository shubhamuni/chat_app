import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const onlineUsers = {};

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log("user joined", socket.id);
    socket.on('join', (receiverId) => {
        onlineUsers[receiverId] = socket.id
        console.log("Receiver ID: ", receiverId, " Socket id: ", socket.id, "online users ", onlineUsers );
        
    })
})
const getReceiverSocketId = (receiverId) => {
    if (onlineUsers.length > 0) {
        return onlineUsers[receiverId];
    } else {
        console.log("no users");
        
    }   
}
export { app, server, io, getReceiverSocketId };

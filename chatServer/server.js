import express from 'express';
import cors from 'cors';
import Connect from "./Connect.js";
import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js';
import { app, server } from './sockets/socket.js'
import MessageRouter from './routes/message.js'

app.use(cors());

app.use(express.json());

app.use('/chat/user', AuthRouter)
app.use('/chat/users', UserRouter)
app.use('/chat/message', MessageRouter)

server.listen(9000, () => {
    Connect();
    console.log("server is running");
})

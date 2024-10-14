import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath to get __dirname
import { dirname } from 'path'; // Import dirname
import Connect from "./Connect.js"; // Your MongoDB connection file
import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js';
import { app, server } from './sockets/socket.js';
import MessageRouter from './routes/message.js';

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the "Public/Images" directory
app.use('/Public/Images', express.static(path.join(__dirname, 'Public/Images')));

// Set up your routes
app.use('/chat/user', AuthRouter);
app.use('/chat/users', UserRouter);
app.use('/chat/message', MessageRouter);

// Start the server
server.listen(9000, () => {
    Connect(); // Connect to your database
    console.log("Server is running on http://localhost:9000");
});

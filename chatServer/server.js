import express from 'express';
import cors from 'cors';
import Connect from "./Connect.js";
import AuthRouter from './routes/auth.js';
import UserRouter from './routes/user.js';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/chat/user', AuthRouter)
app.use('/chat/users', UserRouter)
app.listen(9000, () => {
    Connect();
    console.log("server is running");
})

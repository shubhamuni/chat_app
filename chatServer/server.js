import express from 'express';
import cors from 'cors';
import Connect from "./Connect.js";
import AuthRouter from './routes/Auth.js';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/chat/user', AuthRouter)
app.listen(process.env.PORT || 5001, () => {
    Connect();
    console.log("server is running");
})

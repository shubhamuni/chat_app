import express from 'express'
import { register, upload, login } from '../controllers/register.controller.js';


const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);

export default router;
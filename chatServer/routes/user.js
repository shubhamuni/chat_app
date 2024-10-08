import express from 'express';
import verifyUser from '../middleware/verifyUser';
import users from '../controllers/user.controller';


const router = express.Router();

router.get('/', verifyUser, users)

export default router;
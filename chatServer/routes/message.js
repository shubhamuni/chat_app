import express from 'express';
import verifyUser from './../middleware/verifyUser';
import Conversation from './../models/Conversation';
import Message from './../models/Message';

const router = express.Router();

router.post('/send/:receiverId', async (req,res) => {
    const { receiverId } = req.params;
    const  senderId  = req.user._id;
    const { content } = req.body;

    let conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    })
    if (!conversation) {
        conversation = new Conversation({
            participants:[senderId, receiverId]
        })
    }
})




export default router;
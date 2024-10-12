import express from 'express';
import verifyUser from './../middleware/verifyUser.js';
import Conversation from './../models/Conversation.js';
import Message from './../models/Message.js';

const router = express.Router();

router.post('/send/:receiverId',verifyUser, async (req,res) => {
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
        await conversation.save();
    }
    const newMessage = new Message({
        conversationId: conversation._id,
        sender: senderId,
        content: content,
        createdAt: new Date()

    })
    await Message.save();
    return res.json(newMessage)
})




export default router;
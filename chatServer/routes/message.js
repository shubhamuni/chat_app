import express from 'express';
import verifyUser from './../middleware/verifyUser.js';
import Conversation from './../models/Conversation.js';
import Message from './../models/Message.js';
import { getReceiverSocketId, io } from '../sockets/socket.js';


const router = express.Router();
    router.get('/read/:receiverId', verifyUser, async(req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id; 
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            return res.status(404).json({message: "Not Found"})
        }
        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 })
        
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({msg: error})
        }
    })

try {
    router.post('/send/:receiverId',verifyUser, async (req, res) => {
        const { receiverId } = req.params;
        const senderId = req.user._id;
        const { content } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            })
            await conversation.save();
        }
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            content: content,
            createdAt: new Date()

        });
        await newMessage.save();
        // console.log(newMessage);
        

        setTimeout(() => {
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', newMessage);
            } else {
                console.log('Receiver is not online');
            }
        }, 100);  // Adjust the delay if necessary
        return res.json(newMessage);
    })
} catch (error) {
    console.log(error);
    res.status(500).json(error)
    
}




export default router;
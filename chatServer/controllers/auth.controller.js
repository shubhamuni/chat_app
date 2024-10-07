import multer from 'multer';
import path from 'path';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(
            null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        )
    }
});

export const upload = multer({
    storage: storage
})


async function register(req, res) {
    try {
        const { username, password } = req.body;
        const file = req.file.filename;

        const userExist = await UserModel.findOne({username})
        if (userExist) {
            return res.status(400).json({ msg: "User already existed" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({
            username,
            password: hashPassword,
            image: file
        })

        await newUser.save();

        return res.status(200).json({msg: "success"})

    } catch (error) {
        res.status(500).json({error: "Error" + error})
    }
    console.log(req.body)
}

async function login(req, res) {
     try {
        const { username, password } = req.body;
        const userExist = await UserModel.findOne({username})
        if (!userExist) {
            return res.status(400).json({ msg: "User is not existed" })
         }
         const matchPassword = await bcrypt.compare(password, userExist.password)
         if (!matchPassword) {
            return res.status(400).json({ msg: "Password not matched" })            
        }        

         const token = jwt.sign({ id: userExist._id }, process.env.JWT_KEY, {
             expiresIn: '1h' 
         });
        return res.status(200).json({msg: "success",token, user:{_id: userExist._id, username: userExist.username}})

    } catch (error) {
        res.status(500).json({error: "Error happened at server level" + error})
    }
    console.log(req.body.username);
    
}

const verify = (req, res) => {
    return res.status(200).json({msg: 'success'})
}

export  {register, login, verify};
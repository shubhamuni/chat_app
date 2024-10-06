import multer, { diskStorage } from "multer";
import UserModel from '../models/User.js';
import path from 'path';
import bcrypt from 'bcrypt';

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(
            null, file.fieldname + "_" + Date.now() + path.extname(file.orignalname)
        )
    }
});

export const upload = multer({
    storage: storage
})


async function Register(req, res) {
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

export default Register ;
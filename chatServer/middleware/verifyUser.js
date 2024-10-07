import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const verifyUser = async (req, res, next) => {
    console.log(res);
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({msg: 'unauthorized'})
        }
        const decoded = jwt.verify(token, process.env.KEY)

        if (!decoded) {
            return res.status(401).json({msg: 'unauthorized'})
        }

        const user = await UserModel.findOne(decoded.id).select('-password');

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        
    }
}
export default verifyUser;
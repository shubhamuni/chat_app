import exp from "constants";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {type: String}
})

const userModel = mongoose.model('user', userSchema);
export default userModel;
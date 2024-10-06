import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {type: String}
})

const userModel = mongoose.model('user', userSchema);
export default userModel;
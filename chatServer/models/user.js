import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {type: String}
})

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
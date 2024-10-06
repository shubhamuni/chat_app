import mongoose from 'mongoose';

const Connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected with MongoDB")
    }
    catch (error) {
        console.log(error);
    }
}

export default Connect;
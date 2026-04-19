import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected");
        });
        mongoose.connection.on('error', (error) => {
            console.log(error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
        });
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
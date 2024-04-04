import mongoose from "mongoose";
import 'dotenv/config'


export const dbConnection = async (req, res) =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.log('MongoDB Connection failed: ' + error)
    }

}
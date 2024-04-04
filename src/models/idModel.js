import  mongoose  from "mongoose";
const userIdSchema = new  mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    }
},{ timestamps: true })

 export const userIdModel = mongoose.model('userId', userIdSchema);

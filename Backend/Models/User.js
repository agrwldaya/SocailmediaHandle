
import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }, 
    SelfAllPost:[{
          type:mongoose.Schema.Types.ObjectId,
          ref :"Post"
    }]
}, { timestamps: true });

 

export const User = mongoose.model('User', userSchema);
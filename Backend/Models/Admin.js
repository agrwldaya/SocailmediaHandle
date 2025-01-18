import mongoose from 'mongoose';
 

const AdminSchema = new mongoose.Schema({
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
    AllUserPost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref :"Post"
    }]
     
}, { timestamps: true });

 

export const Admin = mongoose.model('Admin', AdminSchema);
import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryconnect = () => {
    try {
        cloudinary.config(process.env.CLOUDINARY_URL);
     
    } catch (error) {
        // console.log(error)
    }    
};   
import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    socialMediaHandle: {
      type: String,
      required: true
    },
    images: [{
      type: String,   
      required: true
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Post = mongoose.model('Post', PostSchema);

  export default Post;
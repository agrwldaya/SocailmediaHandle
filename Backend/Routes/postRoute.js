import express from 'express'
import upload from '../Middleware/upload.js';
import postController from '../Controllers/postController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
const postrouter = express.Router();
 
 

// Routes
postrouter.post('/createpost', authMiddleware,postController.createPost );
postrouter.get('/getallpost',authMiddleware, postController.getAllPost);
postrouter.get('/myallpost',authMiddleware, postController.myAllPost);


export default postrouter


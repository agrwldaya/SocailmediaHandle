 import express from 'express'
import upload from '../Middleware/upload.js';
const router = express.Router();
 
import  UserController from '../Controllers/Userconntroller.js'
import userController from '../Controllers/Userconntroller.js';
 

// Routes
router.post('/formsubmit', upload.array('images', 5), UserController.createUser );
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUser);

export default router


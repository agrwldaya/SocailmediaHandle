import express from "express"
import { authController } from "../Controllers/authController.js";
 
const AuthRoute = express.Router();



AuthRoute.post('/login',authController.login)
AuthRoute.post('/register',authController.Register)


export default AuthRoute;
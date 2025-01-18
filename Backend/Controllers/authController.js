import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
 
import { Admin } from '../Models/Admin.js';
import { User } from '../Models/User.js';
 

export const authController = {
    async login(req, res) {
        try {
            const { email, password,role} = req.body;
            console.log(req.body);
            // Validate input
            if (!email || !password || !role) {
                return res.status(400).json({success:false, message: 'Email and password are required' });
            }
       
             let user;
            if(role == "admin"){
                  user = await Admin.findOne({ email});
            }else{
                  user = await User.findOne({email})
            }
            
            if (!user) {
                return res.status(401).json({ success:false,message: 'user Not Exist!' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
             
            if (!isValidPassword) {
                return res.status(401).json({success:false, message: 'Invalid Password'});
            }

            const token = jwt.sign(
                { id: user._id, role:role},
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            await user.save();
          
            return res.status(200).json({
                success:true,
                message: 'Login successful',
                token,
                username:user.username,
                email:user.email,
                role,
                expiresIn: 24 * 60 * 60, // 24 hours in seconds
            }); 
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async Register(req, res) {
        try {
            const { username, email, password,role} = req.body;
            
            // Validate input
            if (!username || !email || !password||!role) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            let existingUser;
            if(role =="admin"){
                existingUser = await Admin.findOne({email,username});
            }else{
                existingUser = await User.findOne({email,username});
            }
             
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
             
            let user;

            if(role == "admin"){
                user = new Admin({
                    username,
                    email,
                    password: hashedPassword,
                    AllUserPost:[]
                });
            }else{
                user = new User({
                    username,
                    email,
                    password: hashedPassword,
                    SelfAllPost:[]
                });
            }
            
            const token = jwt.sign(
                { id: user._id, role: role},
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            await user.save();

            res.status(200).json({
                success:true,
                message: 'User created successfully',
                username:user.username,
                email:user.email,
                role:role,
                token
            });
        } catch (error) {
            console.log(error)
            console.error('Registration error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

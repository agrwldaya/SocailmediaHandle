import User from "../Models/Post.js";


  
  const userController = {
    // Create new user with images
    createUser: async (req, res) => {
      try {
        const imageUrls = req.files.map(file => 
          `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );
        
        const user = new User({
          name: req.body.name,
          socialMediaHandle: req.body.socialMediaHandle,
          images: imageUrls
        });
  
        await user.save();

        res.status(201).json({
          success:true,
          user
        });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success:false,message: error.message});
      }
    },
  
    // Get all users
    getAllUsers: async (req, res) => {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({success:true,users});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  
    // Delete user
    deleteUser: async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  export default userController
  
 
 
  
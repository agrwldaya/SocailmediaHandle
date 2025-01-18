import { Admin } from "../Models/Admin.js";
import Post from "../Models/Post.js";
import { User } from "../Models/User.js";


const uploadFile = async (file, folder, quality) => {
  const options = { folder, resource_type: "auto" };
  if (quality) options.quality = quality;
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

  const postController = {
    // Create new user with images
     
        createPost: async (req, res) => {
            try {
              // Validate required fields
              const { name, socialMediaHandle } = req.body;
              const userId = req.user.id;
              console.log(userId)
              if (!name || !socialMediaHandle || !userId) {
                return res.status(400).json({ success: false, message: "Missing required fields." });
              }
        
              if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: "No images provided." });
              }
        
              // Generate image URLs
              let uploadedImagesUrls = [];
              if (req.files && req.files.images) {
                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                const supportedTypes = ["jpg", "jpeg", "png", "pdf"];
          
                for (const image of images) {
                  const docType = image.name.split('.').pop().toLowerCase();
                  if (!supportedTypes.includes(docType)) {
                    return res.status(400).json({
                      success: false,
                      message: "File type not supported for documents!",
                    });
                  }
                }
          
                const uploadImagesPromises = images.map(async (image) => {
                  const response = await uploadFile(image, process.env.FOLDER_NAME);
                  return response.url;
                });
                uploadedImagesUrls = await Promise.all(uploadImagesPromises);
              }
        
              // Create a new post
              const post = new Post({
                name,
                socialMediaHandle,
                images: uploadedImagesUrls,
              });
        
              // Save the post to the database
              await post.save();
        
              // Update user's post list
              const user = await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { SelfAllPost: post._id } },
                { new: true }
              );
              if (!user) {
                return res.status(404).json({ success: false, message: "User not found." });
              }
        
              const findAdmin = await Admin.findOne().sort({ priority: -1 }).exec();

             const admin= await Admin.findByIdAndUpdate(
                { _id: findAdmin._id },
                { $push: { AllUserPost: post._id } },
                { new: true }
              );
        
              // Respond with success
              res.status(201).json({
                success: true,
                post,
                admin,
              });
            } catch (error) {
              console.error("Error creating post:", error);
              res.status(500).json({ success: false, message: "An error occurred while creating the post." });
            }
          },
  
    // Get all users
    getAllPost: async (req, res) => {
        try {
          const userId = req.user.id;
      
          // Find admin by ID and populate the posts
          const admin = await Admin.findById(userId).populate('AllUserPost').exec();
      
          if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
          }
      
          res.status(200).json({ success: true, allpost: admin.AllUserPost });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      },
      
  
    // Delete user
    myAllPost: async (req, res) => {
        try {
          const userId = req.user.id;
          const user = await User.findById({ _id: userId }).populate("SelfAllPost").exec();
      
          res.status(200).json({ success: true, allpost: user.SelfAllPost });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      }
      
  };

  export default postController
  
 
 
  
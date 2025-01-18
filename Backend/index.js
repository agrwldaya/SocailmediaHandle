import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import dbconnect from "./Config/Database.js";
import errorHandler from "./Middleware/errorhandler.js";
 
import AuthRoute from "./Routes/authRoute.js";
import postrouter from "./Routes/postRoute.js";

 
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB();
dbconnect();
// Middleware
app.use(cors(
  {
    origin:"https://socailmedia-handle.vercel.app"
  }
));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',AuthRoute);
app.use('/api/post',postrouter);
// app.use('/api/users',router);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
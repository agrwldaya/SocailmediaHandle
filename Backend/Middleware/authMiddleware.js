import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); // Logs the decoded payload

    // Attach user details to the request body
    req.user = {
        id: decoded.id,
        role: decoded.role,
      };
    
    console.log(req.body.userId)
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or error in verification",
      error: error.message,
    });
  }
};

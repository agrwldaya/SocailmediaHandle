import multer from "multer";


const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: 'File upload error'||'Reduce File size',
        error: err.message
      });
    }
    
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  };
  
  export default errorHandler;
  
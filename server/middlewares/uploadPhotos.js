const multer = require('multer');

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where the uploaded files will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + '.jpg';
    // Store the filename in the request object to access it in the controller
    req.uploadedFiles = req.uploadedFiles || [];
    req.uploadedFiles.push(fileName);
    cb(null, fileName);
  },
});

// Create the Multer instance with the defined storage configuration
const upload = multer({ storage });

// Middleware function to handle the file upload
const uploadPhotos = upload.array('image', 5); // 'photos' is the name of the field in the form

module.exports = uploadPhotos;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Please add your details here
cloudinary.config({
  cloud_name: 'ddjulvosf',
  api_key: '988874615488545',
  api_secret: '9bNCaA4oimb4UFimLrbChkqAUCE'
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'techie-gallery', // I don't find the name of the folder in my cloudinary account
  allowedFormats: ['jpg', 'png'],
  
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

module.exports = multer({ storage });
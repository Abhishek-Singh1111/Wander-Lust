const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    // Remove format or set it dynamically based on file.mimetype
    format: async (req, file) => {
      // Get extension from mimetype, e.g. 'image/jpeg' -> 'jpeg'
      return file.mimetype.split('/')[1];
    },
  },
});
module.exports = {
  cloudinary,
  storage
};
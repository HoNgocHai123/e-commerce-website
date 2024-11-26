const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dgtg6okuc',
  api_key: '538115839735476',
  api_secret: 'frMpo5MHSd-LMoB4y7U7d2-qxdY'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;

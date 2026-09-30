const express = require('express');
const multer = require('multer');
const ImageController = require('../controllers/ImageController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      return callback(null, true);
    }

    const error = new Error('Only image and video files are allowed');
    error.statusCode = 400;
    callback(error);
  }
});

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('file'),
  ImageController.upload
);

module.exports = router;

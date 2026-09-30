const { v2: cloudinary } = require('cloudinary');

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

const isCloudinaryConfigured = Object.values(cloudinaryConfig).every(Boolean);

if (isCloudinaryConfigured) {
  cloudinary.config(cloudinaryConfig);
}

const ensureCloudinaryConfigured = () => {
  if (!isCloudinaryConfigured) {
    const error = new Error('Cloudinary is not configured');
    error.statusCode = 503;
    throw error;
  }
};

module.exports = {
  cloudinary,
  ensureCloudinaryConfigured,
  isCloudinaryConfigured
};

const { cloudinary, ensureCloudinaryConfigured } = require('../config/cloudinary');

const uploadBuffer = (buffer, options = {}) => {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: process.env.CLOUDINARY_FOLDER || 'district404',
        ...options
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
};

module.exports = {
  uploadBuffer
};

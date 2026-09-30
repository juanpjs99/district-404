const MediaService = require('../services/mediaService');

const ImageController = {
  upload: async (req, res, next) => {
    try {
      if (!req.file) {
        const error = new Error('A media file is required');
        error.statusCode = 400;
        throw error;
      }

      const result = await MediaService.uploadBuffer(req.file.buffer);

      res.status(201).json({
        data: {
          assetId: result.asset_id,
          publicId: result.public_id,
          resourceType: result.resource_type,
          format: result.format,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
          duration: result.duration,
          secureUrl: result.secure_url
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ImageController;

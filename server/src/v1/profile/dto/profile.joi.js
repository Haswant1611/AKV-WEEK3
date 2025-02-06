const Joi = require('joi');

// Schema for validating profile update requests (username and email)
const profileUpdateSchema = Joi.object({
  // Validate username (must be a string between 3 and 255 characters)
  username: Joi.string().min(3).max(255),
  
  // Validate email (must be a valid email format and max 255 characters)
  email: Joi.string().email().max(255)
})
  // Ensure at least one of username or email is provided in the request
  .min(1);

// Schema for validating pre-signed URL generation request (fileName required)
const generatePresignedUrlSchema = Joi.object({
  // Validate fileName (must be a string and is required)
  fileName: Joi.string().required()
});

// Schema for validating file metadata saving (fileUrl and fileName required)
const saveFileMetadataSchema = Joi.object({
  // Validate fileUrl (must be a string and is required)
  fileUrl: Joi.string().required(),
  
  // Validate fileName (must be a string and is required)
  fileName: Joi.string().required()
});

// Export the schemas for use in other parts of the application
module.exports = {
  profileUpdateSchema,
  generatePresignedUrlSchema,
  saveFileMetadataSchema
};

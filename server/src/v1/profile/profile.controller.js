const { s3Client } = require('../../aws/s3/s3');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const knex = require('../../mysql/knex');
const use_sharp = require('sharp');

// Fetch user profile information from the database
const getProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from authenticated user
    // Query the database for the user's profile details
    const profile = await knex('users')
      .select('firstname', 'lastname', 'username', 'email', 'thumbnail')
      .where('id', userId)
      .first();

    if (!profile) {
      return res.status(404).json({ error: 'User not found' }); // Return 404 if user not found
    }
    res.status(200).json(profile); // Return the user's profile data
  } catch (error) {
    console.error('Error fetching profile:', error); // Log error if there's an issue
    res.status(500).json({ error: 'Failed to retrieve profile' }); // Return 500 error if unable to fetch profile
  }
};

// Generate a pre-signed URL to upload a file to S3
const generatePresignedUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.body; // Extract file details from the request body
    const { userId } = req.user; // Extract userId from authenticated user

    // Create a unique key for the file in the S3 bucket
    const key = `haswant/${userId}/${Date.now()}_${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME, // Specify the S3 bucket
      Key: key, // Specify the file key (location)
      ContentType: fileType, // Specify the file type (MIME type)
    });

    // Generate a pre-signed URL that is valid for 60 seconds
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    res.status(200).json({ uploadUrl, key }); // Return the pre-signed URL and key for the upload
  } catch (error) {
    console.error('Error generating pre-signed URL:', error); // Log error if generation fails
    res.status(500).json({ error: 'Failed to generate upload URL' }); // Return 500 error if unable to generate URL
  }
};

// Save file metadata and generate a thumbnail for profile picture
const saveFileMetadata = async (req, res) => {
  try {
    const { fileName, fileUrl } = req.body; // Extract file metadata from request
    const { userId } = req.user; // Extract userId from authenticated user
    const bucketUrlPrefix = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
    const key = decodeURIComponent(fileUrl.replace(bucketUrlPrefix, '')); // Extract file key from the URL

    try {
      // Fetch the original image from S3
      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });

      const originalImage = await s3Client.send(getCommand);
      const imageBuffer = await streamToBuffer(originalImage.Body); // Convert image stream to buffer

      // Generate a thumbnail (60x60px) of the profile picture using sharp
      const thumbnailBuffer = await use_sharp(imageBuffer)
        .resize(60, 60, { fit: 'cover', position: 'center' })
        .toBuffer();

      const thumbnailKey = `haswant/${userId}/thumbnails/${Date.now()}_thumb_${fileName}`; // Generate a unique key for the thumbnail
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: thumbnailKey,
        Body: thumbnailBuffer, // Upload the thumbnail buffer
        ContentType: 'image/jpeg', // Set MIME type as JPEG
      });

      // Upload the thumbnail to S3
      await s3Client.send(uploadCommand);
      const thumbnailUrl = `${bucketUrlPrefix}${thumbnailKey}`; // Construct the thumbnail URL

      // Update the user's profile and thumbnail in the database
      await knex('users')
        .where({ id: userId })
        .update({ profile_pic: fileUrl, thumbnail: thumbnailUrl, updated_at: knex.fn.now() });

      const updatedUser = await knex('users')
        .select('id', 'profile_pic', 'thumbnail')
        .where({ id: userId })
        .first();

      res.status(200).json(updatedUser); // Return updated user info
    } catch (s3Error) {
      console.error('Error processing image:', s3Error); // Log error if S3 operations fail

      // If thumbnail creation fails, fall back to setting the same file for both profile and thumbnail
      await knex('users')
        .where({ id: userId })
        .update({ profile_pic: fileUrl, thumbnail: fileUrl, updated_at: knex.fn.now() });

      const updatedUser = await knex('users')
        .select('id', 'profile_pic', 'thumbnail')
        .where({ id: userId })
        .first();

      res.status(200).json(updatedUser); // Return updated user info (without thumbnail)
    }
  } catch (error) {
    console.error('Error saving profile picture:', error); // Log error if saving metadata fails
    res.status(500).json({ error: 'Failed to save profile picture' }); // Return 500 error if something goes wrong
  }
};

// Helper function to convert a stream (from S3) to a buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk); // Collect chunks of the stream
  }
  return Buffer.concat(chunks); // Combine all chunks into a single buffer
};

module.exports = { getProfile, generatePresignedUrl, saveFileMetadata };

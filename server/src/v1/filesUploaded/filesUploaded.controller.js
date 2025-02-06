const { s3Client } = require('../../aws/s3/s3');
const { PutObjectCommand, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const knex = require('../../mysql/knex');

// Helper function to retrieve user data by userId
const getUserById = async (userId) => {
  try {
    //console.log('userId:', userId);
    return await knex('users')
      .select('username')
      .where('id', userId)
      .first();
  } catch (err) {
    console.error(`Error fetching user by ID: ${userId}`, err);
    throw new Error('Error fetching user data');
  }
};

// Generate a pre-signed URL for file upload to S3
const generatePresignedUrl = async (req, res) => {
  try {
    // Extract file details from the request body
    const { fileName, fileType } = req.body;
    const userId = req.user.userId;
    console.log('userId:', userId);

    // Fetch the username from the database using userId
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct the S3 key for the file upload based on the username and file name
    const key = `haswant/${user.username}/${fileName}`;
    
    // Define parameters for the S3 PutObject command
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType
    };

    // Generate a pre-signed URL that will allow the client to upload the file
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    // Return the pre-signed URL and file key in the response
    res.status(200).json({ uploadUrl, key });
  } catch (err) {
    console.error('Error generating pre-signed URL:', err);
    res.status(500).json({ message: 'Failed to generate upload URL', error: err.message });
  }
};

// Generate pre-signed URLs for file download from S3
const downloadFiles = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the username associated with the userId
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract file names from request body or URL parameters
    const fileNames = req.body.fileNames || [req.params.fileName];
    
    // Generate a download URL for each requested file
    const downloadUrls = await Promise.all(
      fileNames.map(async (fileName) => {
        const key = `haswant/${user.username}/${fileName}`;
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key
        });
        const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { fileName, downloadUrl };
      })
    );

    // If only one file is requested, return the download URL directly, otherwise return an array
    res.status(200).json(fileNames.length === 1 ? downloadUrls[0] : { downloadUrls });
  } catch (err) {
    console.error('Error generating download URL(s):', err);
    res.status(500).json({ message: 'Failed to generate download URL(s)', error: err.message });
  }
};

// List all files in the user's S3 folder
const listFiles = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the username associated with the userId
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Define the S3 prefix to list only the user's files
    const prefix = `haswant/${user.username}/`;

    // Execute the S3 ListObjectsV2Command to fetch a list of the user's files
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
      Prefix: prefix
    });

    const data = await s3Client.send(command);
    
    // Filter out folders and map the result to extract only relevant file metadata
    const files = (data.Contents || [])
      .filter(item => item.Key !== prefix) // Skip the root folder entry
      .map(item => ({
        Key: item.Key,
        Size: item.Size,
        LastModified: item.LastModified
      }));

    // Return the list of files in the response
    res.status(200).json({ files });
  } catch (err) {
    console.error('Error listing files:', err);
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
};

module.exports = {
  generatePresignedUrl,
  downloadFiles,
  listFiles
};

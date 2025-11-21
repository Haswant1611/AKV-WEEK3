const express = require('express');
const router = express.Router();
const { generatePresignedUrl, downloadFiles,listFiles } = require('./filesUploaded.controller');
const {authenticateToken} = require('../../middleware/jwt/jwt.middleware');
const checkRole = require('../../middleware/checkrole/checkrole');

require('./api-docs/filesUploaded.docs');
router.use(authenticateToken);

// Generate presigned URL for upload
router.post('/generate-upload-url',  generatePresignedUrl);

router.get('/list', listFiles); 

// Download multiple files
router.post('/download',checkRole([1,2]), downloadFiles);

module.exports = router;

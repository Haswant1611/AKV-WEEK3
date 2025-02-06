const express = require('express');
const router = express.Router();
const profile_controller = require('./profile.controller');
//const authenticateToken = require('../../middleware/jwt/jwt.middleware');

const {authenticateToken} = require('../../middleware/jwt/jwt.middleware');
require('./api-docs/profile.docs');

router.use(authenticateToken);


router.get('/', profile_controller.getProfile);
router.post('/generate-presigned-url', profile_controller.generatePresignedUrl);
router.post('/save-file-metadata',  profile_controller.saveFileMetadata);

module.exports = router;

const express = require('express');
const router = express.Router();
const profile_controller = require('./profile.controller');
//const authenticateToken = require('../../middleware/jwt/jwt.middleware');

const {authenticateToken} = require('../../middleware/jwt/jwt.middleware');
const checkRole = require('../../middleware/checkrole/checkrole');
require('./api-docs/profile.docs');

router.use(authenticateToken);


router.get('/', profile_controller.getProfile);
router.post('/generate-presigned-url',checkRole([1]), profile_controller.generatePresignedUrl);
router.post('/save-file-metadata', checkRole([1]), profile_controller.saveFileMetadata);

module.exports = router;

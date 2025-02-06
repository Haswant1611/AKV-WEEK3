const express = require('express');
const router = express.Router();

// Import the routes
const auth_Routes = require('./auth/auth.routes');
const profile_Routes = require('./profile/profile.routes');
const files_Routes = require('./filesUploaded/filesUploaded.routes');
const inventory_Routes = require('./inventoryManagement/inventory.routes');  

// Use the routes
router.use('/auth', auth_Routes);
router.use('/profile', profile_Routes);
router.use('/files', files_Routes);
router.use('/inventory', inventory_Routes);

module.exports = router;
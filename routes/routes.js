
const express = require('express');
var router = express.Router();

//users
router.use('/auth', require('../controllers/auth'));
// router.use('/projects', require('../controllers/projects'));
// router.use('/videos', require('../controllers/videos'));
// router.use('/profile', require('../controllers/profile'));
// router.use('/footage', require('../controllers/footage'));
// router.use('/traffic_factory', require('../controllers/traffic_factory'));
// router.use('/my_assets', require('../controllers/my_assets'));

//common
// router.use('/common', require('../controllers/common'));

//admin 

// router.use('/user', require('../controllers/users'));
// router.use('/category', require('../controllers/category'));
// router.use('/assets', require('../controllers/assets'));
// router.use('/subscription', require('../controllers/subscription'));
// router.use('/training', require('../controllers/training'));
// router.use('/template', require('../controllers/template'));


module.exports = router;
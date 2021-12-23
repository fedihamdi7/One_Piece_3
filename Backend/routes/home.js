const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/getLatestEvents',homeController.getLatestEvents);

module.exports = router;
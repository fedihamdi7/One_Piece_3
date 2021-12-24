const express = require('express');
const router = express.Router();
const allclubController = require('../controllers/allclub');


router.get('/getAllClub/:id',allclubController.getAllClub);
module.exports = router;
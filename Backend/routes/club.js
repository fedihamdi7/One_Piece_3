const express = require('express');
const router = express.Router();
const clubController = require('../controllers/club');


router.get('/getOneClub',clubController.getClub);
module.exports = router;
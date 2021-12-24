const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/users');


router.get('/getUsers',userController.getUsers);
module.exports = router;
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const auth = require('../middlewares/auth')

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile/:id', auth, authController.profile);

module.exports = router;

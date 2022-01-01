const express = require('express');
const router = express.Router();
const reqController = require('../controllers/admin/request');
const auth=require('../middlewares/auth');


router.get('/pending',auth,reqController.getPending);
router.put('/accept/:user_id/:club_id',reqController.accept);
router.delete('/decline/:user_id/:club_id',auth,reqController.decline);

module.exports = router;

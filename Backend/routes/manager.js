const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager/events');

router.get('/:id/events',managerController.get);
router.put('/:id/events',managerController.update);

module.exports = router;
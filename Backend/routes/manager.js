const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager/events');
const club = require('../models/Club');
const multer = require('multer');
const mongoose = require('mongoose');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/events');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.get('/:id/events', managerController.get);
router.put('/:id/events',multer({storage:storage}).single("event_img") ,(req, res, next) => {

    const event = {
        event_id: req.body.event_id,
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        event_img: req.file.filename,
    }
    club.updateOne({'events.event_id':req.params.id},{'$set':{'events.$':event}})
    .then(events => res.json(events));
});

router.post('/:id/events',multer({storage:storage}).single("event_img") ,(req, res, next) => {


    const event = {
        event_id: mongoose.Types.ObjectId().toString(),
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        event_img: req.file.filename,
    }

    club.updateOne({'_id':req.body.club_id},{'$push':{'events':event}})
    .then(AddedEvent => res.json(AddedEvent));
});

module.exports = router;
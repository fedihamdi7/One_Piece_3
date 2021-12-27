
const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/users');
const adminController = require('../controllers/admin/clubs');
const club = require('../models/Club');
const multer = require('multer');
const mongoose = require('mongoose');

router.get('/getUsers',userController.getUsers);

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/club');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.get('/:id/club', adminController.get);
router.put('/:id/club',multer({storage:storage}).single("club_img") ,(req, res, next) => {

    const club = {
        club_id: req.body.id,
        club_name: req.body.name,
        club_theme: req.body.theme,
        about: req.body.about,
        club_img: req.file.filename,
    }
    club.updateOne({'club.id':req.params.id},{'$set':{'club.$':club}})
    .then(club => res.json(club));
});

router.post('/:id/club',multer({storage:storage}).single("club_img") ,(req, res, next) => {


    const club = {
        club_id: mongoose.Types.ObjectId().toString(),
        club_name: req.body.name,
        club_theme: req.body.theme,
        about: req.body.about,
        club_img: req.file.filename,
    }

    club.updateOne({'_id':req.body.club_id},{'$push':{'club':club}})
    .then(AddedClub => res.json(AddedClub));
});

router.delete('/:id/club', adminController.delete);

module.exports = router;

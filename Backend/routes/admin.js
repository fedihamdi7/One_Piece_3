
const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/users');
const adminController = require('../controllers/admin/clubs');
const Club = require('../models/Club');
const multer = require('multer');
const mongoose = require('mongoose');
const auth=require('../middlewares/auth');


router.get('/getUsers',auth,userController.getUsers);

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
        cb(null, Date.now()+ '-' +name);
    }
});

router.get('/:id/clubs',auth, adminController.get);
router.put('/:id/clubs',auth,multer({storage:storage}).single("image") ,(req, res, next) => {

    const club = new Club ({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
    } );
    const id=req.params.id;
    console.log(id);
    Club.updateOne({'_id':id},{'$set':{ 'title': req.body.title,
        'description': req.body.description,
        'image': req.file.filename}})
    .then(club => {res.json(club);console.log(club)});
});

router.post('/clubs',auth,multer({storage:storage}).single("image") ,(req, res, next) => {


    const club =new Club ({
        club_id: mongoose.Types.ObjectId().toString(),
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
    }
    );
    club.save()
    .then(AddedClub => {res.json(AddedClub);});
});

router.delete('/:id/clubs',auth, adminController.delete);

module.exports = router;

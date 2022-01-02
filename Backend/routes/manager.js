const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager/events');
const teamController = require('../controllers/manager/team');
const club = require('../models/Club');
const multer = require('multer');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageEvents = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/events');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});
const storagePosts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/posts');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});
const storageLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/club');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});
const storageTeam = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/team');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});


//////////////////////////////////////// Events ////////////////////////////////////////
router.get('/:id/events',auth, managerController.get);

router.put('/:id/eventsNoImage',auth, managerController.update);

router.put('/:id/events',auth,multer({storage:storageEvents}).single("event_img") ,(req, res, next) => {

    const event = {
        event_id: req.body.event_id,
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        event_img: req.file.filename,
    }
    club.updateOne({'events.event_id':req.params.id},{'$set':{'events.$':event}})
    .then(events => res.json(events));
});

router.post('/:id/events',auth,multer({storage:storageEvents}).single("event_img") ,(req, res, next) => {


    const event = {
        event_id: mongoose.Types.ObjectId().toString(),
        event_name: req.body.event_name,
        event_date: req.body.event_date,
        event_img: req.file.filename,
    }

    club.updateOne({'_id':req.body.club_id},{'$push':{'events':event}})
    .then(AddedEvent => res.json(AddedEvent));
});

router.delete('/:id/events',auth, managerController.delete);


//////////////////////////////////////// Logo ////////////////////////////////////////

router.put('/:id/logo',auth,multer({storage:storageLogo}).single("logo") ,(req, res, next) => {
      club.updateOne({'_id':req.params.id},{'$set':{'image':req.file.filename}})
      .then(logo => res.json({"logo":req.file.filename}));
});

router.get('/:id/logo',auth, managerController.getLogo);


//////////////////////////////////////// Team ////////////////////////////////////////
router.get('/:id/team',auth, teamController.get);
router.post('/:id/team',auth,multer({storage:storageTeam}).single("team_img"),(req, res, next) =>{

    const team={
        team_id:mongoose.Types.ObjectId().toString(),
        team_name:req.body.team_name,
        team_titre:req.body.team_titre,
        team_img:req.file.filename,
        team_fb:req.body.team_fb,
        team_insta:req.body.team_insta,
        team_linkedin:req.body.team_linkedin,
        team_twitter:req.body.team_twitter,
    }
 
    club.updateOne({'_id':req.params.id},{'$push':{'team':team}})
    .then(Addedteam => {res.json(Addedteam);});
} );
module.exports = router;

router.put('/:id/team',auth,multer({storage:storageTeam}).single("team_img") ,(req, res, next) => {

    const team={
        team_id:req.params.id,
        team_name:req.body.team_name,
        team_titre:req.body.team_titre,
        team_img:req.file.filename,
        team_fb:req.body.team_fb,
        team_insta:req.body.team_insta,
        team_linkedin:req.body.team_linkedin,
        team_twitter:req.body.team_twitter,
    }
    club.updateOne({'team.team_id':req.params.id},{'$set':{'team.$':team}})
    .then(team => {res.json(team); });
});

router.delete('/:id/team',auth, teamController.delete);

//////////////////////////////////////// Stats ////////////////////////////////////////
router.get('/:id/stats',auth, managerController.getStats);


//////////////////////////////////////// about ////////////////////////////////////////

router.put('/:id/about',auth,(req, res, next) => { 
    club.updateOne({'_id':req.params.id},{'$set':{'description':req.body.description}})
    .then(about => res.json({"about":req.body.description}));
});

router.get('/:id/about',auth, managerController.getAbout);

//////////////////////////////////////// post ////////////////////////////////////////

router.put('/:id/post',auth,multer({storage:storagePosts}).single("post_img") ,(req, res, next) => {
    
        const post={
            post_title:req.body.post_title,
            post_description:req.body.post_description,
            post_img:req.file.filename,
        }
        club.updateOne({'_id':req.params.id},{'$set':{'post':post}})
        .then(post => {res.json(post);});
    });
    
router.get('/:id/post',auth,(req, res, next) => {
    club.findOne({'_id':req.params.id})
    .then(post => res.json(post));
} );

//////////////////////////////////////// get user image ////////////////////////////////////////
router.get('/:id/userImage',auth, managerController.getUserImage);
const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const mongoose = require('mongoose');

const authController = require('../controllers/auth');

const bcrypt = require('bcrypt');
const User=require('../models/User');
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageEvents = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/club');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});

router.post('/login', authController.login);


router.post('/signup',multer({storage:storageEvents}).single("user_img") ,(req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      type="";
      if(req.body.type=="manager"){
        type = "pending";
      }else{
        type = "user";
      }
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        type:type,
        user_img:req.file.filename,
      });
    
      user.save()
        .then((ff) => {res.status(201).json({
          message: 'User created !',
          status: 201,
          userId:ff._id
        });
        // console.log(ff);
      })
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));


});



router.post('/clubManager',multer({storage:storageEvents}).single("image") ,(req, res, next) => {

  const club =new Club ({
    club_id: mongoose.Types.ObjectId().toString(),
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
}
);
club.save()
.then(AddedClub => {
  // update user and add club id
  User.updateOne({'_id':req.headers.user_id},{'$set':{ 'club_id': mongoose.Types.ObjectId(AddedClub._id).toString(),'type':'manager'}})
  .then(user => {res.json(user);});
  // res.json(AddedClub); 
  // console.log(mongoose.Types.ObjectId(AddedClub._id).toString());

});

});
module.exports = router;

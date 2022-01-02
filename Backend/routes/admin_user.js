const express = require('express');
const router = express.Router();
const userController = require('../controllers/admin/users');
const bcrypt = require('bcrypt');
const User=require('../models/User');
const auth=require('../middlewares/auth');
const mongoose=require('mongoose');
const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storageEvents = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../FrontEnd/src/assets/img/avatar');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext= MIME_TYPE_MAP[file.mimetype];
        cb(null, Date.now()+ '-' +name);
    }
});





router.get('/getUsers',auth,userController.getUsers);
router.get('/getOneUser/:id',auth,userController.getOneUser);
router.post('/addUser',auth,multer({storage:storageEvents}).single("user_img") ,(req, res, next) => {
    console.log(req.file);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        type:req.body.type,
        user_img:req.file.filename,
      });
    
      user.save()
        .then(() => res.status(201).json({
          message: 'User created !',
          status: 201
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));


});
router.put('/editUser/:id',auth,multer({storage:storageEvents}).single("user_img") ,(req, res, next) => {
    
   
 const id=req.params.id;
 console.log(id);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        type:req.body.type,
        user_img:req.file.filename,
      });

      User.updateOne({"_id":id},{"$set":{"name":req.body.name,"email":req.body.email,"type":req.body.type,"user_img":req.file.filename}})
      .then(resultat=> console.log(resultat)) 
      
      // .then(() => res.status(201).json({
        //   message: 'User modified !',
        //   status: 201
        // }))
        .catch(error => res.status(400).json({
          error
        }));


});
router.delete('/:id/deleteuser',auth,userController.delete)


//////////////////////////////////////// Stats ////////////////////////////////////////
//router.get('/stats',auth, userController.getStats);
router.get('/stats',auth, userController.getStats);


//////////////////////////////////////// Statsclubs ////////////////////////////////////////
//router.get('/stats',auth, userController.getStats);
router.get('/statsclubs', userController.getStatsclubs);
module.exports = router;





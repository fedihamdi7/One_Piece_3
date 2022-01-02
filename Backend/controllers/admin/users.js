const mongoose = require('mongoose');
const users = require('../../models/User');
const clubs = require('../../models/Club');


exports.getUsers = (req, res, next) =>{
    users.find({},{_id:1,name:1,email:1,password:1,type:1,user_img:1})
    .then(userResults => {res.json(userResults);console.log(userResults)});
}
exports.getOneUser = (req, res, next) =>{
    users.find({_id:req.params.id},{_id:1,name:1,email:1,password:1,type:1,user_img:1})
    .then(userResults => res.json(userResults[0]));
}

exports.delete= (req, res, next) =>{
users.deleteOne({_id:req.params.id})
.then(userResults => res.json("succes"));
}

exports.getStats = (req, res, next) => {
  // users.find({},{_id:1})
//    users.size().then(stats => {
//                 res.json(stats);      
//             });

    users.aggregate([
        // {$match:{_id :mongoose.Types.ObjectId()}},
        // {$project : {"users" : {$size :"$users"},_id:0}}
       { $group:{_id:null, users:{$sum:1}}}
        ])
        .then(stats => {
            res.json(stats[0]);      
        });

   }
   exports.getStatsclubs = (req, res, next) => {
    // users.find({},{_id:1})
  //    users.size().then(stats => {
  //                 res.json(stats);      
  //             });
  
      clubs.aggregate([
          // {$match:{_id :mongoose.Types.ObjectId()}},
          // {$project : {"users" : {$size :"$users"},_id:0}}
         { $group:{_id:null, clubs:{$sum:1}}}
          ])
          .then(stats => {
              res.json(stats[0]);      
          });
  
     }
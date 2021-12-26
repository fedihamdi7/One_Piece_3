const mongoose = require('mongoose');
const users = require('../../models/User');


exports.getUsers = (req, res, next) =>{
    users.find({},{_id:1,name:1,email:1,password:1})
    .then(userResults => res.json(userResults));
}
exports.getOneUser = (req, res, next) =>{
    users.find({_id:req.params.id},{_id:1,name:1,email:1,password:1})
    .then(userResults => res.json(userResults[0]));
}

exports.delete= (req, res, next) =>{
users.deleteOne({_id:req.params.id})
.then(userResults => res.json("succes"));
}
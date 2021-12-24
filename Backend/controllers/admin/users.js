const mongoose = require('mongoose');
const users = require('../../models/User');


exports.getUsers = (req, res, next) =>{
    users.find({},{_id:1,name:1,email:1,password:1})
    .then(userResults => res.json(userResults));
}
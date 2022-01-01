const mongoose = require('mongoose');
const allclub = require('../models/Club');


exports.getAllClub = (req, res, next) =>{
    allclub.find({active:"true"},{_id:1,title:1,image:1,description:1})
    .then(allclubResults => res.json(allclubResults));
}

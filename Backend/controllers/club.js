const mongoose = require('mongoose');
const club = require('../models/Club');


exports.getClub = (req, res, next) =>{
    club.find({_id:req.params.id},{_id:1,title:1,image:1,description:1,events:1,team:1,post:1})
    .then(clubResults => res.json(clubResults));
}

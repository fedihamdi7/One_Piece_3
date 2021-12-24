const mongoose = require('mongoose');
const club = require('../models/Club');

exports.getLatestEvents = (req, res, next) => {
    //club.find({},{'events':1})
    club.aggregate([
        {$unwind : "$events"},
        {$project: {events : 1,_id:0}},
        {$limit : 5}
    ])
    // aggregate.unwind("events")
    .then(eventsResults => res.json(eventsResults));
}
exports.getClub = (req, res, next) =>{
    club.find({},{_id:1,title:1,image:1,description:1}).limit(3)
    .then(clubResults => res.json(clubResults));
}
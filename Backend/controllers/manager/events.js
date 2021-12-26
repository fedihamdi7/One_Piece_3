const mongoose = require('mongoose');
const club = require('../../models/Club');

exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'events':1,'_id':0})
    .then(events => res.json(events));
}

exports.update = (req, res, next) => {
    console.log(req.body);
    club.updateOne({'events.event_id':req.params.id},
    {'$set':{
        'events.$.event_date':req.body.event_date,
        'events.$.event_name':req.body.event_name,
    }})
    .then(events => res.json(events));
}



exports.delete = (req, res, next) => {

        club.updateMany(
            {},
            { $pull: { events: { event_id: req.params.id } } }
        )
        .then(result => res.json(result));

    
    };


exports.getLogo = (req, res, next) => {
    club.find({'_id':req.params.id},{'image':1,'_id':0})
    .then(image => res.json(image));
}
const mongoose = require('mongoose');
const club = require('../../models/Club');

exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'events':1,'_id':0})
    .then(events => res.json(events));
}

exports.update = (req, res, next) => {
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

exports.getStats = (req, res, next) => {
    club.aggregate([
        {$match:{_id :mongoose.Types.ObjectId(req.params.id)}},
        {$project : {"events" : {$size :"$events"},_id:0}}
        ])
        .then(stats => res.json(stats[0]));
}

exports.getAbout = (req, res, next) => {
    club.find({'_id':req.params.id},{'description':1,'_id':0})
    .then(description => res.json(description));
}

exports.update = (req, res, next) => {
    club.updateOne({'post.id':req.params.id},
    {'$set':{
        'post.$.post_title':req.body.post_title,
        'post.$.post_description':req.body.post_description,        
    }})
    .then(post => res.json(post));
}
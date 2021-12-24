const mongoose = require('mongoose');
const club = require('../../models/Club');

exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'club':1,'_id':0})
    .then(club => res.json(club));
}

exports.update = (req, res, next) => {
    club.updateOne({'club.id':req.params.id},{'$set':{'club.$':req.body}})
    .then(club => res.json(club));
}

exports.delete = (req, res, next) => {

        club.updateMany(
            {},
            { $pull: { club: { id: req.params.id } } }
        )
        .then(result => res.json(result));

    
    };
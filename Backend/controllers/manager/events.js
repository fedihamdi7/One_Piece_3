const mongoose = require('mongoose');
const club = require('../../models/Club');

exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'events':1,'_id':0})
    .then(events => res.json(events));
}
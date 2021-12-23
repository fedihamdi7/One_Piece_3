const mongoose = require('mongoose');
const club = require('../models/Club');

exports.getLatestEvents = (req, res, next) => {
    club.find({},{'events':1})
    .then(eventsResults => res.json(eventsResults));
}
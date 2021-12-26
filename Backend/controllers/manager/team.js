const club = require("../../models/Club");


exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'team':1,'_id':0})
    .then(teams => res.json(teams[0]));
}
const club = require("../../models/Club");


exports.get = (req, res, next) => {
    club.find({'_id':req.params.id},{'team':1,'_id':0})
    .then(teams => res.json(teams[0]));
}


exports.update = (req, res, next) => {
    club.updateOne({'team.id':req.params.id},
    {'$set':{
        'team.$.team_titre':req.body.team_titre,
        'team.$.team_name':req.body.team_name,
        'team.$.team_fb':req.body.team_fb,
        'team.$.team_insta':req.body.team_insta,
        'team.$.team_linkedin':req.body.team_linkedin,
        'team.$.team_twitter':req.body.team_twitter,
        'team.$.team_name':req.body.team_name,

    }})
    .then(team => res.json(team));
}



exports.delete = (req, res, next) => {

        club.updateMany(
            {},
            { $pull: { team: { id: req.params.id } } }
        )
        .then(result => res.json(result));

    };

    
    


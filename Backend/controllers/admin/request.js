const mongoose = require('mongoose');
const Club = require('../../models/Club');
const User = require('../../models/User');
const nodemailer = require('nodemailer');

// Club.find({'active': 'false'})
// .then(club => {
//     console.log(club);
//     User.find({'type': 'pending'})
//     .then(user => {res.json([{
//         club_name: club[0].title,
//         club_description: club[0].description,
//         user: user[0].name,
//         user_id: user[0]._id,
//         club_id: club[0]._id
//     }])
// });

// });
exports.getPending = (req, res, next) => {
    Club.aggregate([
        {
            $lookup: {
                from: 'clubs',
                localField: '_id',
                foreignField: 'club_id',
                as: 'user'
            }
        },
        {
            $match: {
                'active': 'false'
            }
        }
        ]).then(club => {
                    User.find({'type': 'pending'})
                    .then(user => {
                        res.json(club.map((club,index) => {
                          
                            return {
                                club_name: club.title,
                                club_description: club.description,
                                user: user[index].name,
                                user_id: user[index]._id,
                                club_id: club._id
                            }
                        })
                        );
            });
    });
}

exports.accept = (req, res, next) => {
    Club.findByIdAndUpdate(req.params.club_id, {$set: {active: 'true'}})
    .then(club => {
        User.findByIdAndUpdate(req.params.user_id, {$set: {type: 'manager'}})
        .then(user => {
            var mailTransporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "53d0249e92d926",
                  pass: "33a5a5c8ca77aa"
                }
              });
            let text = "Hello,\n\n";
            let mailDetails = {
                from: 'Clubix@support',
                to:  user.email,
                subject: 'Test mail',
                text: 'You Request has been accepted , Welcome to our community'
            };
            
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
        });
    
    });
}

exports.decline = (req, res, next) => {
    
    //delete user 
    User.findByIdAndDelete(req.params.user_id)
    .then(user =>  Club.findByIdAndDelete(req.params.club_id)
        .then(club => {
            var mailTransporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "53d0249e92d926",
                  pass: "33a5a5c8ca77aa"
                }
              });
            let text = "Hello,\n\n";
            let mailDetails = {
                from: 'Clubix@support',
                to: user.email,
                subject: 'Test mail',
                text: 'You Request has been Declined'
            };
            
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            res.status(200);
    }))
    
   
}

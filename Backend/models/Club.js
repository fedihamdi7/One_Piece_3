const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    title: {type : String, required: false},
    image : {type : String, required: false},
    description : {type : String, required: false},
    events : {type : Array , required: false},
    team : {type : Array , required: false},
});

module.exports = mongoose.model('Club', ClubSchema);
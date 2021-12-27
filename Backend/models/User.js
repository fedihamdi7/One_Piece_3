const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: false, unique: true},
    password: {type: String, required: false},
    club_id:{type: String, required: false},
    type:{type: String, required: false},
    user_img:{type: String, required: false},
});

module.exports = mongoose.model('User', userSchema);

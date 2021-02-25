
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('User', userSchema);



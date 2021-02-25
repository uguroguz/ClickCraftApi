var mongoose = require('mongoose');
//Skill Schema
var skillSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
});

var Skill = module.exports = mongoose.model('Skill', skillSchema);

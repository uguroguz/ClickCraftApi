var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    skillRequired:{
        type: String
    },
    minSkillLevel:{
        type: Number
    },
    //depending on item you can assume its drop rate also
    successRate:{
        type: Number
    },
    sellPrice:{
        type: Number
    },
    buyPrice:{
        type: Number
    },
    //required materials to craft
    materials:[{
        materialName:{
            type: String
        },
        amount:{
            type:Number
        }
    }]
});


var Item = module.exports = mongoose.model('Item', itemSchema);
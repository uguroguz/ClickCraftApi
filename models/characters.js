var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    coin:{
        type: Number
    },
    skills:[{
        name:{
            type: String,
            required: true
        },
        value:{
            type: Number,
            required: true
        }
    }],
    inventory:[{
        itemName:{
            type: String,
        },
        amount:{
            type:Number
        },
        sellPrice:{
            type:Number
        },
        buyprice:{
            type:Number
        }

    }],
    age:{
        type: Date,
        default: Date.now
    }
});

var Character = module.exports = mongoose.model('Character',characterSchema);

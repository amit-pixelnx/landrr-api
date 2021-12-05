const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    price :{ type: String },
    type :{ type: String},
    renderCount :{ type: Number, default:0},
    scope :{ type: Array},
    description :{ type: String},
    status :{ type: Number, default:1},
    isCreated :{type: Date, default: Date.now},
});

var userSchema = mongoose.model('subscription',Schema);
module.exports = userSchema


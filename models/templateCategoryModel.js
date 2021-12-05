const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    userId :{ type: String},
    slug :{ type: String},
    type :{ type: String},
    templateCount : { type: Number, default:0},
    status :{ type: Number, default:1},
    isCreated :{type: Date, default: Date.now},
});

var userSchema = mongoose.model('template_category',Schema);
module.exports = userSchema


const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    projectName :{ type: String},
    slug :{ type: String},
    userId :{ type: String},
    videoCount : { type : Number, default:0},
    status :{ type: Number, default:1},
    isCreated :{type: Date, default: Date.now},
});

var userSchema = mongoose.model('project',Schema);
module.exports = userSchema


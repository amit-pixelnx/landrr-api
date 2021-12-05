const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    videoTitle :{ type: String},
    slug :{ type: String},
    userId :{ type: String},
    projectId :{ type: String},
    status :{ type: Number, default:1},
    isCreated :{type: Date, default: Date.now},
});

var userSchema = mongoose.model('video',Schema);
module.exports = userSchema


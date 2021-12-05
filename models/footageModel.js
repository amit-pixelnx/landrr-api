const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    userId  : { type: String},
    type :{ type: String},
    path :{ type: String},
    source :{ type: Number , default : 0}, //0 for upload and 1 for gettyImage
    status :{ type: Number , default : 1},    
    thumb :{ type: String},
    mediaMeta :{ type: Object},
    isCreated: { type: Date, default: Date.now },
});

var footageSchema = mongoose.model('footage',Schema);
module.exports = footageSchema


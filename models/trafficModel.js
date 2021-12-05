const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    userId  : { type: String},
    description : { type: String},
    author : { type: String},
    keywords : { type: String},
    thumb : { type: String},
    // fbMeta : { type: String},
    // twitterMeta : { type: String},
    source :{ type: String},
    sourceTarget :{ type: String},
    view :{ type: Number , default : 0},
    uniqueView :{ type: Number , default : 0},
    status :{ type: Number , default : 1},
    isCreated: { type: Date, default: Date.now },
});

var trafficSchema = mongoose.model('traffic',Schema);
module.exports = trafficSchema


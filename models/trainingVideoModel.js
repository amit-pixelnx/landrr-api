const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    category :{ type: String}, 
    tags :{ type: String},
    url :{ type: String},
    videoType :{ type: String}, //1  for YouTube , 2 for Vimeo, 3 for AWS uploaded files
    type :{ type: String}, //training video or studio video
    status :{ type: Number, default:1}, // 0 in-active, 1 active, 2 on-hold
    thumb :{ type: String},
    mediaMeta :{ type: Object},
    isCreated :{type: Date, default: Date.now},
    isUpdated :{type: Date, default: Date.now}
});

var trainingVideoSchema = mongoose.model('training_video',Schema);
module.exports = trainingVideoSchema


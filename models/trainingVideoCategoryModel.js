const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    action : { type: Boolean , default : true},
    type : { type: String}, //we are managing Training and Studio categories in same table
    isCreated :{type: Date, default: Date.now},
});

var trainingVideoSchema = mongoose.model('training_video_category',Schema);
module.exports = trainingVideoSchema


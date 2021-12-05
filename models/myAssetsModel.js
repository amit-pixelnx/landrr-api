const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    userId :{ type: String},
    libType :{ type: String},
    fileType :{ type: String},
    path :{ type: String},
    thumb :{ type: String},
    mediaMeta : {type : Object},
    isCreated :{type: Date, default: Date.now},
});

var my_assetsSchema = mongoose.model('my_assets',Schema);
module.exports = my_assetsSchema


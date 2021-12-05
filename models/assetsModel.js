const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    categoryId :{ type: String},
    type :{ type: String}, //file type
    tags :{ type: String},
    path :{ type: String},
    status :{ type: Number , default : 1},
    thumb :{ type: String},
    mediaMeta :{ type: Object},
    isCreated: { type: Date, default: Date.now },
});

var assestsSchema = mongoose.model('assets',Schema);
module.exports = assestsSchema
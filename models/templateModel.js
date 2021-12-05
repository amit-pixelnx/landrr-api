const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title: { type: String },
    userId: { type: String },
    categoryId: { type: String },
    thumb: { type: String },
    preview: { type: String },
    templateData: { type: Object },
    tags: { type: String },
    status: { type: Number, default: 1 },
    type: { type: String},
    isCreated: { type: Date, default: Date.now },
});

var templateSchema = mongoose.model('template', Schema);
module.exports = templateSchema


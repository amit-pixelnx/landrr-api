const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    title :{ type: String},
    type :{ type: String},
    uploadsCount :{ type: Number , default : 0},
    isCreated :{type: Date, default: Date.now},
});

var userSchema = mongoose.model('assets_category',Schema);
module.exports = userSchema


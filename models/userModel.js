const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    firstName :{ type: String},
    lastName :{ type: String},
    email :{ type: String},
    password :{ type: String},
    profilePic :{ type: String},
    role :{ type: Number , default : 0}, //1 for admin, 2 sub-admin , 0 for user
    subscription:{type:Array},
    parentId :{ type: String},
    status :{ type: Number, default:1}, // 0 in-active, 1 active, 2 on-hold
    isCreated :{type: Date, default: Date.now},
    isUpdated :{type: Date, default: Date.now}
});

var userSchema = mongoose.model('user',Schema);
module.exports = userSchema


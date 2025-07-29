const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const User_Schema = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true}
})

const UserSave_Schema = new Schema({
    userId: {type: ObjectId, unique: true},
    ipcSec: {type: [String], default: []},
    crpcSec: {type: [String], default: []},
    cpcSec: {type: [String], default: []},
    idaSec: {type: [String], default: []},
    ieaSec: {type: [String], default: []},
    mvaSec: {type: [String], default: []},
})
const UserReadLater_Schema = new Schema({
    userId: {type: ObjectId, unique: true},
    ipcSec: {type: [String], default: []},
    crpcSec: {type: [String], default: []},
    cpcSec: {type: [String], default: []},
    idaSec: {type: [String], default: []},
    ieaSec: {type: [String], default: []},
    mvaSec: {type: [String], default: []},
})
const User_Model = mongoose.model("user",User_Schema);
const UserSave_Model = mongoose.model("saveLaw",UserSave_Schema);
const UserReadLater_Model = mongoose.model("readLaterLaw",UserReadLater_Schema);

module.exports = {
    User_Model,
    UserSave_Model,
    UserReadLater_Model
}
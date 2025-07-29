const mongoose = require("mongoose");
const {Schema} = mongoose;

const MessageSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    message: {type: String, require: true}
})

const Message_Model = mongoose.model("Messages",MessageSchema);

module.exports = {Message_Model};
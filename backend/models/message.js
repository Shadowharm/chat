const mongoose = require("mongoose");

const messageScheme = new mongoose.Schema({
  date: String,
  title: Srting,
  sender: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

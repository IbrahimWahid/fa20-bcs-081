const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  text:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  },
  });
let Model = mongoose.model("answer", modelSchema);
module.exports = Model;
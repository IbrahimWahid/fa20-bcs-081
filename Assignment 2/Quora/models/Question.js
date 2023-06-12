const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  text:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
  });
let Model = mongoose.model("question", modelSchema);
module.exports = Model;
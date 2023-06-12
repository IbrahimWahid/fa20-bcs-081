const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
let Model = mongoose.model("user", modelSchema);
module.exports = Model;
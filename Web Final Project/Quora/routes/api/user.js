const express = require("express");
const User = require("../../models/User");
let router = express.Router();
router.post("/api/user", async function (req, res) {
  let record = new User(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/user/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/user/:id", async function (req, res) {
  let record = await User.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/user/:id", async function (req, res) {
  let record = await User.findById(req.params.id);
  res.send(record);
});
router.get("/api/user", async function (req, res) {
  let records = await User.find();
  res.send(records);
});

module.exports = router;

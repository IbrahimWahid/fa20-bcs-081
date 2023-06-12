const express = require("express");
const Answer = require("../../models/Answer");
let router = express.Router();
router.post("/api/answer", async function (req, res) {
  let record = new Answer(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/answer/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Answer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/answer/:id", async function (req, res) {
  let record = await Answer.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/answer/:id", async function (req, res) {
  let record = await Answer.findById(req.params.id);
  res.send(record);
});
router.get("/api/answer", async function (req, res) {
  let records = await Answer.find();
  res.send(records);
});

module.exports = router;

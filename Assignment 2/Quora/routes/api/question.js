const express = require("express");
const Question = require("../../models/Question");
let router = express.Router();
router.post("/api/question", async function (req, res) {
  let record = new Question(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/question/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/question/:id", async function (req, res) {
  let record = await Question.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/question/:id", async function (req, res) {
  let record = await Question.findById(req.params.id);
  res.send(record);
});
router.get("/api/question", async function (req, res) {
  let records = await Question.find();
  res.send(records);
});

module.exports = router;

const express = require("express");
const app=express();
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require("cookie-parser");
var session = require("express-session");
let authmiddleware = require("./middlewares/sessionAuth");
let Questions = require("./models/Question");
let Answers = require("./models/Answer");
let User = require("./models/User");

app.use(express.json());
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/api/answer"));
app.use("/", require("./routes/api/question"));
app.use("/", require("./routes/api/user"));


app.get("/", async (req, res) => {
    let questions = await Questions.find();
    return res.render("homepage", { questions});
});

app.post("/", authmiddleware, async function (req, res) {
  let question = req.body;
  let user_id = req.session.user._id;
  let data = {
    "text": question['text'],
    "user": user_id,
  }
  console.log(data)
  let new_qs = new Questions(data);
  await new_qs.save();
  return res.redirect("/");
});

app.get("/question/:id", async function (req, res) {
  let record = await Questions.findById(req.params.id);
  console.log(record._id)
  let answers = await Answers.find({ question: record._id })
  console.log(answers)
  return res.render("question", {record, answers});
});

// app.get("/question/:id", async function (req, res) {
//   try {
//     let record = await Questions.findById(req.params.id)
//     record.userobj = await User.findById(record.userId)
//     console.log(record)
//     let answers = await Answers.find({ question: req.params.id })
//       .populate({ path: 'user', select: 'name' })
//       .exec();

//     console.log(answers);

//     // Attach the user name to the record object
//     record.userName = record.user.name;

//     // Attach the user name to each answer object
//     answers.forEach((answer) => {
//       answer.userName = answer.user.name;
//     });

//     return res.render("question", { record, answers });
//   } catch (error) {
//     console.error(error);
//     // Handle error appropriately
//   }
// });

app.post("/question/:id", authmiddleware, async function (req, res) {
  console.log('feifie')
  let answers = req.body;
  let user_id = req.session.user._id;
  let data = {
    "text": answers['text'],
    "user": user_id,
    "question": req.params.id
  }
  console.log(data)
  let new_ans = new Answers(data);
  await new_ans.save();
  return res.redirect("/question/"+req.params.id);
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(4000, () => {
  console.log("Server Started");
});
const mongoose = require("mongoose");
  mongoose
  .connect("mongodb+srv://ibbi:ibbi@cluster0.grrhhwh.mongodb.net/FinalLab?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));

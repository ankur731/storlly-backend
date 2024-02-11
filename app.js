const express = require("express");
const cors = require("cors");
// const Todo = require("./models/todo");
const mongoose = require("mongoose");

const app = express();
mongoose
  .connect(
    "mongodb+srv://ankur73tiwari:KdWSeUuTC7z03dny@cluster0.rh2lnkv.mongodb.net/storlly?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());



// require("./models/todo");
// app.use(require("./routes/todo"));
app.use(require("./routes/user"));

app.listen(8000, function (err) {
  console.log("server is running");
});

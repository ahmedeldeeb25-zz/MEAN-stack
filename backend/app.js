const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const app = express();


// app.use( (req,res,next)=>{
//     console.log("Hello from middleware");
// next();
// })
mongoose
  .connect(
    "mongodb://localhost:27017/meanstack",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoose connect successfuly");
  })
  .catch(err => {
    console.log("some error happend " + err);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/////////////// App Routes //////////////////////
app.use("/api/posts",postRoutes);



module.exports = app;

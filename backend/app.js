const express = require("express");
const path=require("path");
const cors = require("cors");
//import express from 'express';
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRouter = require("./routes/user");
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
app.use("/images",express.static(path.join('backend/images')))

/////////////// App Routes //////////////////////
app.use("/api/posts",postRoutes);
app.use("/api/users",userRouter);



module.exports = app;

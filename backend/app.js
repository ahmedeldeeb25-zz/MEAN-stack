const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Post=require("./models/post");

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

app.get("/api/posts", (req, res, next) => {
  const posts = new Post();

  Post.find().then(document=>{
    res.status(200).json({
      message: "Data fetched successfuly",
      body: document
    });
  })
  
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save().then(() => console.log('meow'));
  console.log(post);
  res.status(201).json({
    message: "data saved successfuly"
  });
});

app.delete("/api/posts/:id",(req,res,next)=>{
console.log(req.params.id);
Post.deleteOne({_id:req.params.id}).then(response=>{
  console.log(response);
  res.status(200).json({message:'Post deleted'});
});
});

module.exports = app;

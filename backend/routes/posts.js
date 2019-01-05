const express = require("express");
const router =  express.Router();
const Post = require("../models/post");

router.get("", (req, res, next) => {
    const posts = new Post();
  
    Post.find().then(document => {
      res.status(200).json({
        message: "Data fetched successfuly",
        body: document
      });
    });
  });
  
  router.post("", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then(() => console.log("meow"));
    console.log(post);
    res.status(201).json({
      message: "data saved successfuly"
    });
  });
  
  router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(response => {
      console.log(response);
      res.status(200).json({ message: "Post deleted" });
    });
  });
  
  router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message:"Post not Found!"});
      }
    });
  });

  module.exports = router;
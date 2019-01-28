const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(req.userData);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  });
};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  console.log(post);
  Post.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    post
  ).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Unautherized operation!" });
    }
  });
};

exports.getPosts = (req, res, next) => {
  console.log(req.query);
  const page = req.query.page;
  const size = parseInt(req.query.size);
  const postQuery = Post.find(); // will be executed when you call then
  let fetchPosts;

  if (page && size) {
    postQuery.skip(size * (page - 1)).limit(size);
  }

  postQuery
    .then(documents => {
      fetchPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchPosts,
        total: count
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Post deleted!" });
      } else {
        res.status(401).json({ message: "Unautherized operation!" });
      }
    }
  );
};

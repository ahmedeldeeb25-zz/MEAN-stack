const express = require("express");

const postController = require("../controllers/post");
const checkAuth = require("../middlewares/check-auth");
const extractFile = require("../middlewares/file");

const router = express.Router();

router.post("", checkAuth, extractFile, postController.createPost);

router.put("/:id", checkAuth, extractFile, postController.updatePost);

router.get("/", postController.getPosts);

router.get("/:id", postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;

const express = require("express");
const postController = require("../controller/post");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

//add post
router.post("/", isLoggedIn, postController.addPost);
//get posts
router.get("/", postController.getPosts);
//delete post
router.delete("/:id", isLoggedIn, postController.deletePost);

module.exports = router;

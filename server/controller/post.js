const jwt = require("jsonwebtoken");
const Post = require("../model/postModel");
const _ = require("lodash");
const config = require("config");

const addPost = async (req, res, next) => {
  console.log(req.author);
  let newPost = new Post(_.pick(req.body, ["title", "description", "author"]));
  newPost = await newPost.save();
  return res.send({ newPost });
};

const getPosts = async (req, res, next) => {
  const posts = await Post.find();
  if (posts.length > 0) return res.send(posts);
  else return res.send({ message: "No Posts Found" });
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post) {
    //Check if the post is created by current User
    if (req.currentUser.email === post.author) {
      const deleted = await Post.deleteOne(post);
      if (deleted) return res.send({ message: "Post Deleted" });
    } else {
      return res.send({ message: "Unauthorised Access..." });
    }
  } else {
    return res.send({ message: `POST Not Found For ID: ${id}` });
  }
};

module.exports = {
  addPost,
  getPosts,
  deletePost,
};

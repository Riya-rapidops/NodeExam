const mongoose = require("mongoose");
//define schema
let postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const tableName = "posts";
const Post = mongoose.model(tableName, postSchema);
module.exports = Post;

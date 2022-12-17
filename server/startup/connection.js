const mongoose = require("mongoose");

//Mongo DB connection
const DATABASE_NAME = "NodeExam";
const HOST_NAME = "127.0.0.1:27017";

mongoose.connect(`mongodb://${HOST_NAME}/${DATABASE_NAME}`);
mongoose.connection.on("connected", () => {
  console.log("Database connected... ");
});
mongoose.connection.on("error", (err) => {
  console.log("Connection failed...", err);
});

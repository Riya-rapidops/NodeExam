const bcrypt = require("bcrypt");
const { User, validateUser } = require('../model/userModel');
// const User = require("../model/userModel");
const _ = require("lodash");

const addUser = async (req, res, next) => {
  const error = validateUser.validate(req.body);
  if (error.error) return res.send({message: error.error.message});

  const isExists = await User.findOne({
    email: req.body.email,
    phone: req.body.phone,
  });
  if (isExists) return res.send({ message: "User Already Registered" });
  else {
    try {
      let newUser = new User(
        _.pick(req.body, [
          "name",
          "email",
          "password",
          "phone",
          "age",
          "gender",
          "address",
        ])
      );
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      newUser = await newUser.save();
      return res.send({ newUser });
    } catch (err) {
      console.log(err);
    }
  }
};

const getUsers = async (req, res, next) => {
  const users = await User.find();
  if (users.length > 0) res.status(200).send(users);
  else res.status(200).send("No Users Found");
};

module.exports = {
  addUser,
  getUsers,
};

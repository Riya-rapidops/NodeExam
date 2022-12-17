const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../model/userModel");
const _ = require("lodash");
const config = require('config');

const getLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //Check if user Exists
  const user = await User.findOne({ email });
  if (user === null)
    return res.send({ message: "User not found... Please SignUp" });

  //if user exists check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.send({ message: "Please Enter correct Email or Password" });

  const token = generateToken(_.pick(user, ['id', 'name', 'email', 'phone']));
  return res.send(token);
};

function generateToken(data) {
  const token = jwt.sign(data, config.get("jwtPrivateKey"));
  return token;
}
module.exports = {
  getLogin,
};

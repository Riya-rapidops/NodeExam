const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Verify JWT Token
  const token = req.body.token;
  if (token === null) return res.send("User Not Loggedin");
  jwt.verify(token, config.get("jwtPrivateKey"), (err, data) => {
    if (err) return res.send("Invalid Token");
    req.currentUser = data.data;
    req.body.author = data.data.email;
    next();
  });
};

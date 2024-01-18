const { User } = require("../db");

async function userMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const user = await User.findOne({ jwtKey: header });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).send("Please Signin again");
  }
}

module.exports = userMiddleware;

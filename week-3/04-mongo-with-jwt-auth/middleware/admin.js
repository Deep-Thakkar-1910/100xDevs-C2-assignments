// Middleware for handling auth
const { Admin } = require("../db");
async function adminMiddleware(req, res, next) {
  const header = req.headers.authorization;
  const user = await Admin.findOne({ jwtKey: header });
  if (user) {
    next();
  } else {
    res.status(400).send("Please Signin again");
  }
}

module.exports = adminMiddleware;

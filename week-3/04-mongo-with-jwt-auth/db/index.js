const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect("mongodb+srv://Deep:Deep1910@100xdevsc1.8tsgrey.mongodb.net/");

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
  jwtKey: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  jwtKey: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.Mixed }],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  descritption: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};

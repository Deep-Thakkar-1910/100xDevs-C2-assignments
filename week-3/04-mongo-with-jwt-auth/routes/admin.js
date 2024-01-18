const { Admin, Course } = require("../db");
const express = require("express");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
// Admin Routes
router.use(express.json());
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const admin = new Admin({
    username,
    password,
  });
  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "Admin Created successfully" });
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await Admin.findOne({ username, password });
  if (!user) {
    res.status(400).json({ message: "Incorrect username or password" });
  } else {
    try {
      const jwtKey = `Bearer ${jwt.sign(username, "SECRET")}`;
      user.jwtKey = jwtKey;
      user.save().then(() => {
        res.status(200).json({ token: jwtKey });
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  }); // creating a new course using an admin account

  newCourse
    .save()
    .then(() => {
      // saving the new course in Course model in database
      const courseID = newCourse._id;
      newCourse.published = true;
      return res.status(200).json({
        message: "New Course Created Successfuly",
        courseId: courseID,
      });
    })
    .catch((err) => {
      return res.status(400).send("Something is wrong with your inputs");
    });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.status(200).json({ allCourses: allCourses });
});

module.exports = router;

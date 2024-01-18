const { User, Course } = require("../db");
const { Router } = require("express");
const express = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
router.use(express.json());
// User Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password });
  user
    .save()
    .then(() => {
      res.status(200).json({ message: "User Created Successfully" });
    })

    .catch(() => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username, password });
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

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});
  res.status(200).json({ allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const user = req.user;
  const CourseID = req.params.courseId;
  const courseToBePurchased = await Course.findById(CourseID);
  if (!courseToBePurchased) {
    res.status(404).send("Course not found");
  } else {
    const doesCourseExist = user.purchasedCourses.find(
      (courseObject) => courseObject._id.toString() === CourseID
    );
    if (doesCourseExist) {
      res.status(400).send("You have already purchased this course");
    } else {
      user.purchasedCourses.push(courseToBePurchased);
      await user.save();
      res.status(200).send("Course Purchased Successfully");
    }
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  const user = req.user;
  if (user.purchasedCourses.length === 0) {
    res.status(200).send("You don't have any purchased courses");
  } else {
    res.status(200).json(user.purchasedCourses);
  }
});
module.exports = router;

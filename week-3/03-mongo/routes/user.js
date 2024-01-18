const express = require("express");
const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = Router();
// User Routes
router.use(express.json());
router.post("/signup", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  }); // signing up a new user
  newUser.save().then(() => {
    res.status(200).send("new user has been created");
  }); // saving new user in the database
});

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({}); // logic to list all the avaialable courses
  if (allCourses.length === 0) {
    res.send("There are no Courses available");
  } else {
    res.json(allCourses);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const courseToBePurchased = req.params.courseId;
    const course = await Course.findById(courseToBePurchased);
    if (!course) {
      // if no course is found by the given course id param
      res.status(404).send("Course not found");
    }
    const user = req.user; // the user object from middleware
    const courseExists = user.purchasedCourses.find(
      (courseObject) => courseObject._id.toString() === courseToBePurchased
    );
    if (courseExists) {
      res.send("You have already purchased this course");
    } else {
      user.purchasedCourses.push(course); // add the course to the user's purchased courses list
      await user.save(); // resaving the user to make changes
      res.status(200).json({ message: "Course purchased successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  try {
    const user = req.user; // the user object from middleware
    const purchasedCourses = user.purchasedCourses;
    if (purchasedCourses.length === 0) {
      // if the user has no purchased courses
      res.send("you haven't purchased any courses yet");
    } else {
      res.json(purchasedCourses); // list all the purchased courses
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

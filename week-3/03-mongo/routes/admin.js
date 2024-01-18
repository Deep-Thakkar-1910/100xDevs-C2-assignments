const express = require('express');

const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
router.use(express.json());
// Admin Routes
router.post('/signup', (req, res) => { 


    const username = req.body.username;
    const password = req.body.password;
    const newAdmin = new Admin({
        username  : username,
        password : password
    }); // signing up a new user
    newAdmin.save().then(()=>{ 
       return  res.status(200).send("Admin Created Successfuly");
    }).catch(()=>{
        return res.status(403).send("Something is wrong with your inputs");
    }) // saving new admin in the database
});

router.post('/courses', adminMiddleware, (req, res) => {
    const newCourse = new Course({
        title : req.body.title,
        description:req.body.description,
        price : req.body.price,
        imageLink : req.body.imageLink
    }); // creating a new course using an admin account

    newCourse.save().then(()=>{ // saving the new course in Course model in database
        const courseID = newCourse._id;
        newCourse.published = true;
        return res.status(200).json({message:"New Course Created Successfuly",courseId:courseID});
    }).catch((err)=>{
        return res.status(400).send("Something is wrong with your inputs");
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
   const allCourses = await Course.find({}); // logic to list all the avaialable courses 
        if(allCourses.length === 0) {
           res.send("There are no Courses available");
        }
        else{
            res.json(allCourses);
        }
});

module.exports = router;
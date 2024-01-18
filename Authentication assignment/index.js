/* const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
    const user = ALL_USERS.find(user=>user.username === username && user.password === password)
    return user ? true : false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, "shhhhh");
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    return res.json({users:ALL_USERS.filter(user=>user.username !== username)})
    // return a list of users other than this username
  } catch (err) {
    return rese.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000) */

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const jwtPassword = "12345";
app.use(express.json());

const userNameExists = (username)=>{
  const user = ALL_USERS.find(user=> username === user);
  return user??false;
}

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];


app.post("/signin",(req,res)=>{
  const username = req.body.username;
  // const password = req.body.password;
  
  if(!userNameExists){
    res.status(403).json({error: "User does not exists"});
  }
  const token =  jwt.sign({username:username},"algo");
  return res.json({token:token});
});


app.get("/users",(req,res)=>{
  const auth = req.headers.authorization;
try{
  const decoded = jwt.verify(auth,"algo");
  console.log(decoded)
  const username = decoded.username;
  console.log(username)
  return res.json({users:
    ALL_USERS.filter(person=>person.username!==username)
  }) ;

}catch(err){
  return res.status(400).json({message:"something is wrong with your inputs"});
}

});

app.listen(3000,()=>{
  console.log("The server is running on port 3000 ")
})
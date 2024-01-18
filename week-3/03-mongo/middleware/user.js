const {User}  = require('../db');
async function userMiddleware(req, res, next) {
    try{
        const {username, password} =req.headers; // getting the username and password from the headers
        if(!username || !password){ // if one of the headers is empty
            res.status(400).send("Missing username or password Headers")
        }
        const user = await User.findOne({username,password}); // fetching the user from the database
        if(user){
            req.user = user; // sending the user from middleware to handler function for performing operations
            next();
        }else{
            res.status(403).send("Invalid username or password"); // if no user is found with given username or password

        }

    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}

module.exports = userMiddleware;
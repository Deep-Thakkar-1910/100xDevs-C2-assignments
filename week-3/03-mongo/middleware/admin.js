const {Admin} = require('../db/index');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try{
        const {username,password} = req.headers; // getting the username and password from the headers
        if(!username || !password){  // if one of the headers is empty
            res.status(400).send("Missing username or password Headers");
        }
        const admin = await Admin.findOne({username,password}); // fetching the user from the database
            if(admin){
                next();
        }else{
            res.status(403).send("Invalid username or password"); // if no user is found with given username or password
         }
        
        
    }catch(err){
        res.status(500).send("Internal Server error");
    }
           
}

module.exports = adminMiddleware;
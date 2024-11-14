// here the middlewares used for the authentication and autharization will be placed

const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async(req,res,next) =>{
    const token = req.header("Authorization");

    if(!token)
    {
        res.status(401).json({
            message:"No token found, authorization denied",
        })
    }
    
    if(!token.startsWith("Bearer ")) {
        return res.status(401).json({
            message:"Token is not in the correct format",
        })
    }


    try{
        const decoded = jwt.verify(token, process.env.SECRET);   // here decoded consists of payload i.e user info.
        req.user = decoded; // the users id has been placed in to the user object from TOKEN
        next();
    }catch(error)
    {
        res.status(401).json({
            success:false,
            message:"Token is invalid, Unable to authorize the user"
        })
    }
}

module.exports = {auth};
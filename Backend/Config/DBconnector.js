// here's the function for connecting the database with backend app

const mongoose = require("mongoose");
require("dotenv").config();

const DBconnector = async() =>{
    try{
       await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
       })
       console.log("Database is connected successfully")

    }catch(error)
    {
       console.error(error);
       console.log("Error occured while connecting with DB");
       process.exit(1);
    }
}

module.exports = DBconnector;
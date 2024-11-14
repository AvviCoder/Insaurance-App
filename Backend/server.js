// Here's the main file for creating the backend app

const express = require("express");
const app = express();
const DBconnector = require("./Config/DBconnector");
require("dotenv").config();
require("./Config/DBconnector");
const cors = require("cors");

// console.log('Cloud Name:', process.env.CLOUD_NAME);
// console.log('API Key:', process.env.API_KEY); 
// console.log('API Secret:', process.env.API_SECRET);  // for testing purpose

// DB connection initiated
DBconnector();

app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
  }));
  

app.use(express.json());

const customerRoutes = require("./Routes/customerRoutes");
const kycRoutes = require("./Routes/kycRoutes");
app.use("/api/customers",  customerRoutes);
app.use("/api/kyc", kycRoutes);

app.get("/" , (req,res) =>{
    res.send("The app is running file....");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`The app is running file at ${PORT}`);
})


// here all the controllers will be placed those are related to customer

const Customer = require("../Models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerCustomer = async (req, res) => {
  const { name, email, phone, password } = req.body; 

  try {
    if (!name || !email || !phone || !password) { 
      return res.status(400).json({
        success: false,
        message: "Please fill all the required details",
      });
    }

    const userPresent = await Customer.findOne({ email });
    if (userPresent) {
      return res.status(400).json({
        success: false,
        message: "User already exists, no need for re-registration",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customerEntry = new Customer({
      name,
      email,
      phone, // Changed 'number' to 'phone'
      password: hashedPassword,
    });

    await customerEntry.save();

    return res.status(200).json({
      success: true,
      message: "The user entry is created successfully",
    });
  } catch (error) {
    console.error("Error in registerCustomer:", error);

    return res.status(500).json({
      success: false,
      message: "Error occurred while creating a user entry, registerCustomer",
    });
  }
};



const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Find the user by email
    const user = await Customer.findOne({ email });
    
    // If user is not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered in the Insurance database",
      });
    }

    // Compare the input password with the stored hashed password
    const check = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "Password entered is incorrect",
      });
    }

    // If password is correct, generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "2h",
    });
    
    
    // Return the success response with the token
    return res.status(200).json({
      success: true, // Changed this to true
      message: "User Logged In Successfully",
      token,  // Corrected token placement
    });
  } catch (error) {
    // Return error response in case of any internal server error
    return res.status(500).json({
      success: false,
      message: "Unable to login the user, Internal server error",
    });
  }
};

const getProfile = async (e) => {
  try {
    const id = req.user.id;
    const spottedUser = await Customer.findById(id).select("-password"); // will get the user excluding password
    if (!spottedUser) {
      return res.status(400).json({
        sucess: false,
        message: "Unable to find the user",
      });
    }

    return res.json({ spottedUser });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the user",
    });
  }
};

const getKycStatus = async (req, res) => {
  try {
    const user = req.user;

    const kycStatus = user.kycStatus || "Pending";

    return res.status(200).json({
      kycStatus,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch the current KYC status of the user",
    });
  }
};

module.exports = { registerCustomer, loginCustomer, getProfile, getKycStatus };

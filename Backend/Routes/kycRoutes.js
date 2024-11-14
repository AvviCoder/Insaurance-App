const express = require("express");
const router = express.Router();

const {getKycStatus} = require("../Controllers/customerController");
const {auth} = require("../Middlewares/auth");

// only those users can access the getStatus func who have loggedin
router.get("/kycstatus",auth, getKycStatus);

module.exports = router;
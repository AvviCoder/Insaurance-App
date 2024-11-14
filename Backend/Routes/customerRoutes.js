// Here all the routes related to the customer will be placed

const express = require("express");
const router = express.Router();

const {registerCustomer, loginCustomer, getProfile} = require("../Controllers/customerController");
const {auth} = require("../Middlewares/auth");
const {fileUpload} = require("../Controllers/fileUploadController");

const multer = require("multer");

const upload = multer({
    limits:{fileSize: 10*1024*1024},
    storage:multer.memoryStorage(),
});

router.post("/upload",upload.single('Document'), fileUpload);


router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.get("/profile", auth, getProfile);

module.exports = router;


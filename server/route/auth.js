const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { registerUser, LoginUser, authenticate, Logout } = require("../controller/auth");

const router = express.Router(); // get || post || put || delete || ....

// Create User
router.post("/register", upload.none(), registerUser);

//login
router.post("/login", upload.none(), LoginUser);

//logout
router.post("/logout", upload.none(), Logout);

//authenticate
router.post("/auth", requireSignin, authenticate);

module.exports = router;

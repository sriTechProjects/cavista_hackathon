const express = require("express");
const { signup } = require("../../controllers/auth/signup");
const { signin } = require("../../controllers/auth/signin");
const router = express.Router();

// Register route
router.post("/signup", signup);

// Login route
router.post("/signin", signin);

module.exports = router;

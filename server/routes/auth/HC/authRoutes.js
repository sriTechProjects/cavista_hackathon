const express = require("express");
const {
  registerHCInventory,
} = require("../../../controllers/auth/HCInventory/signup");
const {
  signinHCInventory,
} = require("../../../controllers/auth/HCInventory/signin");
const router = express.Router();

// Register route
router.post("/signup", registerHCInventory);
router.post("/signin", signinHCInventory);

module.exports = router;

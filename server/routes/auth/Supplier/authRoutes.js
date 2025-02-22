const express = require("express");
const {
  registerSupplier,
} = require("../../../controllers/auth/Suppliers/signup");
const { loginSupplier } = require("../../../controllers/auth/Suppliers/signin");
const router = express.Router();

// Register route
router.post("/signup", registerSupplier);
router.post("/signin", loginSupplier);

module.exports = router;

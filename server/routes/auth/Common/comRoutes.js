const express = require("express");
const { logout } = require("../../../controllers/auth/logout");
const TokenVerification = require("../../../controllers/Verify/tokenVerify");
const router = express.Router();

router.post("/logout", logout);

router.get("/verify", TokenVerification);

module.exports = router;

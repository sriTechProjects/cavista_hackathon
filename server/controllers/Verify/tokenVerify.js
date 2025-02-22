const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const TokenVerification = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "User is not authenticated",
      success: false,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
          success: false,
        });
      }
      console.log(payload);

      if (!payload.id || !payload.type) {
        return res.status(401).json({
          message: "Invalid token structure",
          success: false,
        });
      }

      req.user = {
        id: payload.id,
        role: payload.role,
      };

      return res.status(200).json({
        message: "User authenticated successfully",
        success: true,
        user: req.user,
      });
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
});

module.exports = TokenVerification;

const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signinHCInventory = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find HCInventory by email
    const hcInventory = await prisma.hCInventory.findUnique({
      where: { email },
    });

    if (!hcInventory) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, hcInventory.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: hcInventory.id, email: hcInventory.email, type: hcInventory.type },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Sign-in successful.",
      hcInventory: {
        id: hcInventory.id,
        name: hcInventory.name,
        email: hcInventory.email,
        phoneNo: hcInventory.phoneNo,
        inchargeName: hcInventory.inchargeName,
        type: hcInventory.type,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = { signinHCInventory };

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../../lib/prisma");

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

    3;
    2;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: "None",
    });
    return res.status(200).json({
      message: "Logout Successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Logout Failed",
      success: false,
    });
  }
});

const registerHCInventory = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNo,
    inchargeName,
    street,
    landmark,
    city,
    state,
    country,
    zip,
    type, // hospital, chemist, pharmacy, clinic
  } = req.body;

  if (!email || !password || !name || !phoneNo || !type) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  if (!["hospital", "chemist", "pharmacy", "clinic"].includes(type)) {
    return res.status(400).json({ message: "Invalid inventory type." });
  }

  try {
    const existingHC = await prisma.hCInventory.findUnique({
      where: { email },
    });

    if (existingHC) {
      return res.status(400).json({ message: "HCInventory already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.hCInventory.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNo,
        inchargeName,
        type,
        address: {
          create: { street, landmark, city, state, country, zip },
        },
      },
    });

    res.status(201).json({
      message: "HCInventory account created successfully.",
    });
  } catch (error) {
    console.error("HCInventory Signup error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

router.post("/signin", signinHCInventory);
router.post("/signup", registerHCInventory);
router.post("/logout", logout);

module.exports = router;

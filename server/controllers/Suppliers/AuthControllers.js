const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const prisma = require("../../lib/prisma");
const router = express.Router();

const loginSupplier = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { email: email },
    });

    if (!supplier) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, supplier.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: supplier.id, email: supplier.email, type: "supplier" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful.",
      supplier: {
        id: supplier.id,
        companyName: supplier.companyName,
        email: supplier.email,
        phoneNo: supplier.phoneNo,
        inchargeName: supplier.inchargeName,
      },
    });
  } catch (error) {
    console.error("Supplier login error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

const registerSupplier = asyncHandler(async (req, res) => {
  const { companyName, email, password, phoneNo, inchargeName } = req.body;

  try {
    const existingSupplier = await prisma.supplier.findUnique({
      where: { email },
    });

    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSupplier = await prisma.supplier.create({
      data: {
        companyName,
        email,
        password: hashedPassword,
        phoneNo,
        inchargeName,
      },
    });

    res.status(201).json({
      message: "Supplier registered successfully.",
      supplier: newSupplier,
    });
  } catch (error) {
    console.error("Supplier registration error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

router.post("/signin", loginSupplier);
router.post("/signup", registerSupplier);

module.exports = router;

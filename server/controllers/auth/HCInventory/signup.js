const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

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

  // Validate required fields
  if (!email || !password || !name || !phoneNo || !type) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Validate HCInventory type
  if (!["hospital", "chemist", "pharmacy", "clinic"].includes(type)) {
    return res.status(400).json({ message: "Invalid inventory type." });
  }

  try {
    // Check if HCInventory already exists
    const existingHC = await prisma.hCInventory.findUnique({
      where: { email },
    });

    if (existingHC) {
      return res.status(400).json({ message: "HCInventory already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create HCInventory
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

module.exports = { registerHCInventory };

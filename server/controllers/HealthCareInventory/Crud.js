const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const prisma = require("../../lib/prisma");

const getUser = asyncHandler(async (req, res) => {
  const { email } = req.params; 

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const userInfo = await prisma.hCInventory.findFirst({
      where: { email },
    });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found." });
    }

    const { password, ...user } = userInfo;
    res.status(200).json({
      message: "Info fetched successfully",
      userDetails: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

router.get("/:email", getUser);

module.exports = router;

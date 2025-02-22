const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

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

module.exports = { registerSupplier };

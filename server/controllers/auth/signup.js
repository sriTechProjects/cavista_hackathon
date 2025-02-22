const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Buyer = require("../../models/buyer");
const Seller = require("../../models/seller");

const signup = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, contactNumber, age, gender, street, landmark, city, state, country, zipcode, shopName } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Determine if it's a Seller registration
  const isSeller = !!shopName;

  // Validate required fields
  // Update the required fields validation
const requiredFields = isSeller
? ['firstName', 'lastName', 'contactNumber', 'age', 'gender', 'street', 'city', 'state', 'country', 'zipcode', 'shopName']
: ['firstName', 'lastName', 'contactNumber', 'age', 'gender', 'street', 'city', 'state', 'country', 'zipcode'];
if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
  return res.status(400).json({ message: "Valid gender is required" });
}

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  try {
    // Check existing user
    const existingUser = isSeller
      ? await Seller.findOne({ email })
      : await Buyer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user data
    const userData = {
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
      phoneNo: contactNumber,
      age: parseInt(age),
      gender: gender.toLowerCase(),
    };

    // Add address/shopAddress
    if (isSeller) {
      userData.shopName = shopName;
      userData.shopAddress = { street, landmark, city, state, country, zip: zipcode };
    } else {
      userData.address = { street, landmark, city, state, country, zip: zipcode };
    }

    // Create new user
    const newUser = isSeller
      ? await Seller.create(userData)
      : await Buyer.create(userData);

    res.status(201).json({
      message: `${isSeller ? 'Seller' : 'Buyer'} account created successfully.`,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = { signup };
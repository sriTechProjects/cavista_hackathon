const mongoose = require("mongoose");

const ShopAddressSchema = new mongoose.Schema({
  street: { type: String, default: "" },
  landmark: { type: String, default: "" },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
});

const SellerSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true },
  shopName: { type: String, required: true },
  shopAddress: { type: ShopAddressSchema, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  twoFactorAuth: { type: Boolean, default: false },
  ratings: { type: String, default: "" },
  reviews: { type: String, default: "" },
});

module.exports = mongoose.model("Seller", SellerSchema);

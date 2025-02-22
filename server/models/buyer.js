const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { type: String, default: "" },
  landmark: { type: String, default: "" },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },  
});

const BuyerSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  twoFactorAuth: { type: Boolean, default: false },
  orders: { type: Array, default: [] },
});

module.exports = mongoose.model("Buyer", BuyerSchema);

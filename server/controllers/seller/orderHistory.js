require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const asyncHandler = require("express-async-handler");

const router = express.Router();

// MongoDB connection URI
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

router.get(
  "/orderhistory",
  asyncHandler(async (req, res) => {
    try {
      await client.connect();
      const db = client.db("Hackathon_WCA");
      const ordersCollection = db.collection("orders");

      const orderHistory = await ordersCollection.find({}).toArray(); // Fetch all orders
      console.log(orderHistory);  
      res.json(orderHistory);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order history", error });
    } finally {
      await client.close(); // Close the connection
    }
  })
);

module.exports = router;

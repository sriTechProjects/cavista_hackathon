const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = require("../../lib/prisma");

const AllOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany();

    const fixedOrders = orders.map((order) => ({
      ...order,
      quantity: order.quantity ?? 0,
    }));

    console.log(orders);

    res.json(fixedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

router.get("/getAll", AllOrders);

module.exports = router;

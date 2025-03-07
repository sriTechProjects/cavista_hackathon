const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cron = require("node-cron");

const prisma = new PrismaClient();
const router = express.Router();

const order = async (req, res) => {
  try {
    const products = await prisma.products.findMany();

    const lowStockProducts = products.filter(
      (product) => product.product_qty <= product.threshold_amount
    );

    if (lowStockProducts.length === 0) {
      return res.json({ message: "No products are low in stock." });
    }

    let totalCost = 0;
    const response = lowStockProducts.map((product) => {
      totalCost += product.product_price * 10;
      return {
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        product_qty: 10,
      };
    });

    res.status(200).json({ products: response, total_cost: totalCost });
  } catch (error) {
    console.error("Order error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

cron.schedule("0 0 */4 * *", async () => {
  console.log("Running scheduled restock check...");
  try {
    const products = await prisma.products.findMany();
    const lowStockProducts = products.filter(
      (product) => product.product_qty <= product.threshold_amount
    );

    if (lowStockProducts.length === 0) {
      console.log("No products are low in stock.");
      return;
    }

    let totalCost = 0;
    const restockOrder = lowStockProducts.map((product) => {
      totalCost += product.product_price * 10;
      return {
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        product_qty: 10,
      };
    });

    console.log("Restock order generated:", restockOrder);
    console.log("Total restock cost: ₹", totalCost);
  } catch (error) {
    console.error("Error running scheduled restock order:", error.message);
  }
});

router.get("/", order);

module.exports = router;

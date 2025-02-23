const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = require("../../lib/prisma");

const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      threshold_amount,
      product_qty,
      product_location,
      subcategory,
      supplier_id,
      supplierId,
      orderId,
    } = req.body;

    if (!product_name || !product_price || !product_qty || !product_location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = await prisma.products.create({
      data: {
        product_name,
        product_price,
        threshold_amount,
        product_qty,
        product_location,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const AllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        product_id: id,
      },
    });
    return res.status(200).json({
      message: "Product Deleted Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete product",
      details: error.message,
    });
  }
};

router.post("/create", createProduct);
router.get("/getAll", AllProducts);
router.delete("/del/:id", deleteProduct);

module.exports = router;

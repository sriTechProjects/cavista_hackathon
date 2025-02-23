const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Create a new role
router.post("/roles", async (req, res) => {
  try {
    const { role_type } = req.body;
    const role = await prisma.roles.create({
      data: { role_type },
    });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, username, email, address, role_id } = req.body;
    const user = await prisma.users.create({
      data: { name, username, email, address, role_id },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new category
router.post("/categories", async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await prisma.categories.create({
      data: { category_name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new sub-category
router.post("/subcategories", async (req, res) => {
  try {
    const { subcat_name, category_id } = req.body;
    const sub_category = await prisma.sub_category.create({
      data: { subcat_name, category_id },
    });
    res.json(sub_category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new supplier
router.post("/suppliers", async (req, res) => {
  try {
    const { supplier_name, sup_email, sup_address, priority } = req.body;
    const supplier = await prisma.suppliers.create({
      data: { supplier_name, sup_email, sup_address, priority },
    });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      threshold_amount,
      product_qty,
      product_location,
      subcat_id,
      supplier_id,
    } = req.body;
    const product = await prisma.products.create({
      data: {
        product_name,
        product_price,
        threshold_amount,
        product_qty,
        product_location,
        subcat_id,
        supplier_id,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
router.post("/orders", async (req, res) => {
  try {
    const { quantity, status, product_id } = req.body;
    const order = await prisma.orders.create({
      data: { quantity, status, product_id },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new batch
router.post("/batches", async (req, res) => {
  try {
    const { batch_name, expiry_date, quantity_in_batch, product_id } = req.body;
    const batch = await prisma.batches.create({
      data: { batch_name, expiry_date, quantity_in_batch, product_id },
    });
    res.json(batch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new unit
router.post("/units", async (req, res) => {
  try {
    const { batch_id } = req.body;
    const unit = await prisma.unit.create({
      data: { batch_id },
    });
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

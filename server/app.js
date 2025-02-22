require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authorize = require('./config/authorize');

const app = express();

const HealthCareAuths = require("./controllers/HealthCareInventory/AuthControllers");
const SuppliersAuths = require("./controllers/Suppliers/AuthControllers");
const TokenVerify = require("./config/TokenVerify");
const HealthCareRoutes = require("./controllers/HealthCareInventory/Crud");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth/hcInventory", HealthCareAuths);
app.use("/api/auth/Suppliers", SuppliersAuths);
app.use("/api", TokenVerify);
app.use("/api/hcInventory", HealthCareRoutes);

app.get('/users',authorize(["Admin"]),getAllusers);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

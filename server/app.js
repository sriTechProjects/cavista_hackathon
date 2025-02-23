require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const HealthCareAuths = require("./controllers/HealthCareInventory/AuthControllers");
const SuppliersAuths = require("./controllers/Suppliers/AuthControllers");
const TokenVerify = require("./config/TokenVerify");
const HealthCareRoutes = require("./controllers/HealthCareInventory/Crud");
const createRoutes = require("./controllers/createRoutes");
const order = require("./controllers/order");
const ProductsRoutes = require("./controllers/products/ProductRoutes");
const OrderRoutes = require("./controllers/orders/orderRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

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
app.use("/api", createRoutes);
app.use("/api/restock", order);

app.use("/api/products", ProductsRoutes);
app.use("/api/orders", OrderRoutes);

// Start server on PORT
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

const HealthCareAuths = require("./controllers/HealthCareInventory/AuthControllers");
const SuppliersAuths = require("./controllers/Suppliers/AuthControllers");
const TokenVerify = require("./config/TokenVerify");
const HealthCareRoutes = require("./controllers/HealthCareInventory/Crud");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Allow frontend to connect
    methods: ["GET", "POST"],
  },
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

// WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const THRESHOLD_AMOUNT = 50;

// Function to check and update orders
const checkProductStock = async () => {
  console.log("Checking product stock...");

  try {
    const products = await prisma.product.findMany();

    for (const product of products) {
      if (product.quantity >= THRESHOLD_AMOUNT) {
        let existingOrder = await prisma.order.findFirst({
          where: { products: { some: { id: product.id } } },
          include: { products: true },
        });

        if (existingOrder) {
          const isProductInOrder = existingOrder.products.some(
            (p) => p.id === product.id
          );

          if (!isProductInOrder) {
            await prisma.order.update({
              where: { id: existingOrder.id },
              data: {
                products: { connect: { id: product.id } },
                amount: existingOrder.amount + product.price * product.quantity,
              },
            });

            io.emit("orderUpdated", {
              message: `Order ${existingOrder.id} updated with ${product.name}`,
            });
          }
        } else {
          const newOrder = await prisma.order.create({
            data: {
              clientName: "Automated Order",
              dateOfOrder: new Date(),
              amount: product.price * product.quantity,
              products: { connect: { id: product.id } },
            },
          });

          io.emit("orderCreated", {
            message: `New Order ${newOrder.id} created for ${product.name}`,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error checking product stock:", error);
  }
};

// Run stock check every 30 seconds
const CHECK_INTERVAL = 3 * 1000;

setInterval(async () => {
  try {
    console.log("Running stock check...");
    await checkProductStock();
  } catch (error) {
    console.error("Error in stock check:", error);
  }
}, CHECK_INTERVAL);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});

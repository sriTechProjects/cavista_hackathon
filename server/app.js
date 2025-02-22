require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbSetup");
const cookieParser = require("cookie-parser");

const app = express();
const authRoutes = require("./routes/auth/authRoutes");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/saarthi/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

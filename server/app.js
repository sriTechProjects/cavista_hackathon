require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const authBeneficiaryRoutes = require("./routes/auth/HC/authRoutes");
const authSupplierRoutes = require("./routes/auth/Supplier/authRoutes");
const commonRoutes = require("./routes/auth/Common/comRoutes");

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
app.use("/api/auth/hc", authBeneficiaryRoutes);
app.use("/api/auth/supp", authSupplierRoutes);
app.use("/api/", commonRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

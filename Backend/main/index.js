const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./Database"); // استخدم pool مباشرة بدون { poolPromise }

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/customers", require("./Routes/Customers"));
app.use("/products", require("./Routes/products"));
app.use("/invoices", require("./Routes/invoices"));
app.use("/trucks", require("./Routes/trucks"));
app.use("/truckloads", require("./Routes/truckloads"));
app.use("/payments", require("./Routes/payments"));
app.use("/orders", require("./Routes/order"));
app.use("/wallet", require("./Routes/wallet"));
app.use("/gate", require("./Routes/gate"));

// Serve React build
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

// Catch-all route for React (any path not starting with /api)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Root API اختياري للتأكد
app.get("/api", (req, res) => res.send("🚀 API is running!"));

// Start server بعد التأكد من DB
async function startServer() {
  try {
    const [rows] = await pool.execute("SELECT 1 AS Test");
    console.log("✅ DB Connected:", rows);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message || err);
    process.exit(1); // خروج من العملية إذا DB غير متصلة
  }
}

startServer();
const express = require("express");
const cors = require("cors");
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

// Root
app.get("/", (req, res) => res.send("🚀 API is running!"));

// Test DB connection before starting server
async function startServer() {
  try {
    // تجربة استعلام بسيط للتأكد من الاتصال
    const [rows] = await pool.execute("SELECT 1 AS Test");
    console.log("✅ DB Connected:", rows);

    // Start server بعد التأكد من DB
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message || err);
    process.exit(1); // خروج من العملية إذا DB غير متصلة
  }
}

startServer();
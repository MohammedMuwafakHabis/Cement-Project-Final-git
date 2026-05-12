const express = require("express");
const router = express.Router();
const pool = require("../Database"); // استخدم mysql2

// GET /gate/lookup?by=order&value=123
router.get("/lookup", async (req, res) => {
  const { by, value } = req.query;

  if (by !== "order") {
    return res.status(400).json({ error: "نوع البحث غير مدعوم" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT 
          o.order_id,
          o.customer_id,
          o.cement_type,
          o.quantity,
          o.total_cost,
          o.status,
          o.truck_name,
          o.plate_number,
          o.driver_name,
          o.delivery_date,
          c.name AS customer_name
        FROM Orders o
        LEFT JOIN Customer c ON o.customer_id = c.customer_id
        WHERE o.order_id = ?`,
      [value]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "الطلب غير موجود" });
    }

    const rec = rows[0];
    const response = {
      order_number: rec.order_id,
      customer_id: rec.customer_id,
      customer_name: rec.customer_name,
      truck_name: rec.truck_name,
      plate_number: rec.plate_number,
      driver_name: rec.driver_name,
      cement_type: rec.cement_type,
      quantity: rec.quantity,
      total_cost: rec.total_cost,
      status: rec.status,
      delivery_date: rec.delivery_date,
    };

    return res.json(response);
  } catch (err) {
    console.error("❌ خطأ أثناء جلب بيانات الطلب:", err);
    return res.status(500).json({ error: "خطأ داخلي في السيرفر", details: err.message });
  }
});

// POST /truckloads - تسجيل دخول الشاحنة
router.post("/truckloads", async (req, res) => {
  try {
    const {
      customer_id,
      order_id,
      weight_empty,
      weight_full,
      status,
      truck_name,
      plate_number,
      driver_name
    } = req.body;

    const net_weight = weight_full - weight_empty;

    // إدخال في TruckLoad
    const [result] = await pool.execute(
      `INSERT INTO TruckLoad (
        customer_id,
        order_id,
        weight_empty,
        weight_full,
        net_weight,
        status,
        truck_name,
        plate_number,
        driver_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_id, order_id, weight_empty, weight_full, net_weight, status, truck_name, plate_number, driver_name]
    );

    // تحديث حالة الطلب
    await pool.execute(
      `UPDATE Orders
       SET status = ?
       WHERE order_id = ?`,
      [status, order_id]
    );

    return res.status(201).json({ message: "✅ تم تسجيل الدخول بنجاح" });
  } catch (err) {
    console.error("❌ خطأ أثناء تسجيل التحميلة:", err);
    return res.status(500).json({ error: "❌ فشل في تسجيل التحميلة", details: err.message });
  }
});

module.exports = router;
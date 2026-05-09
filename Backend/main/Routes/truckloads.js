const express = require("express");
const router = express.Router();
const pool = require("../Database"); // mysql2 pool

// ✅ إضافة تحميلة جديدة وتحديث حالة الطلب
router.post("/", async (req, res) => {
  console.log("🚚 بيانات التحميلة المستلمة:", req.body);

  const {
    order_id,
    status,
    customer_id,
    truck_id,
    product_id,
    truck_name,
    plate_number,
    driver_name,
    weight_empty = 0,
    weight_full = 0,
  } = req.body;

  if (!order_id) return res.status(400).json({ error: "رقم الطلب مفقود" });
  if (!status) return res.status(400).json({ error: "الحالة مفقودة" });
  if (!customer_id) return res.status(400).json({ error: "معرف العميل مفقود" });

  try {
    // ✅ 1. التحقق من الحالة الحالية للطلب
    const [statusCheck] = await pool.execute(
      `SELECT status FROM Orders WHERE order_id = ?`,
      [order_id]
    );

    if (statusCheck.length === 0) {
      return res.status(404).json({ error: "🚫 الطلب غير موجود" });
    }

    const currentStatus = statusCheck[0].status;

    // ✅ 2. التحقق من صلاحية التغيير حسب الحالة
    if (status === "قيد التنفيذ" && currentStatus !== "جديد") {
      return res.status(400).json({ error: "🚫 لا يمكن تغيير الحالة إلى 'قيد التنفيذ' لأن الحالة الحالية ليست 'جديد'" });
    }

    if (status === "منتهي" && currentStatus !== "قيد التنفيذ") {
      return res.status(400).json({ error: "🚫 لا يمكن تغيير الحالة إلى 'منتهي' لأن الحالة الحالية ليست 'قيد التنفيذ'" });
    }

    // ✅ 3. منع تكرار نفس التحميلة لنفس الطلب والحالة
    const [duplicateCheck] = await pool.execute(
      `SELECT * FROM TruckLoad WHERE order_id = ? AND status = ?`,
      [order_id, status]
    );

    if (duplicateCheck.length > 0) {
      return res.status(400).json({ error: "🚫 تم تسجيل تحميلة مسبقًا بهذه الحالة لنفس الطلب" });
    }

    // ✅ 4. تحديث حالة الطلب
    await pool.execute(
      `UPDATE Orders SET status = ? WHERE order_id = ?`,
      [status, order_id]
    );

    // ✅ 5. تسجيل التحميلة
    await pool.execute(
      `INSERT INTO TruckLoad (
        order_id,
        customer_id,
        truck_id,
        product_id,
        truck_name,
        plate_number,
        driver_name,
        weight_empty,
        weight_full,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        order_id,
        customer_id,
        truck_id || null,
        product_id || null,
        truck_name || "",
        plate_number || "",
        driver_name || "",
        weight_empty,
        weight_full,
        status
      ]
    );

    return res.status(201).json({ success: true, message: "✅ تم تحديث الحالة وتسجيل التحميلة بنجاح" });
  } catch (err) {
    console.error("❌ خطأ أثناء تسجيل التحميلة:", err);
    return res.status(500).json({ error: "خطأ داخلي في السيرفر", details: err.message });
  }
});

module.exports = router;
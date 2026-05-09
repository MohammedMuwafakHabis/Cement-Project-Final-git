const express = require("express");
const router = express.Router();
const pool = require("../Database"); // mysql2 pool

// ✅ إضافة شاحنة جديدة
router.post("/", async (req, res) => {
  const { customer_id, plate_number, driver_name, truck_name } = req.body;
  try {
    const [result] = await pool.execute(
      `INSERT INTO Truck (customer_id, plate_number, driver_name, truck_name)
       VALUES (?, ?, ?, ?)`,
      [customer_id, plate_number, driver_name, truck_name]
    );

    res.status(201).json({
      message: "✅ تم إضافة الشاحنة",
      truckId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ فشل في إضافة الشاحنة" });
  }
});

// ✅ جلب كل الشاحنات
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM Truck");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ فشل في جلب الشاحنات" });
  }
});

// ✅ جلب شاحنة واحدة برقمها
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM Truck WHERE truck_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "🚫 الشاحنة غير موجودة" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ خطأ في جلب بيانات الشاحنة" });
  }
});

// ✅ حذف شاحنة برقمها
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [check] = await pool.execute("SELECT * FROM Truck WHERE truck_id = ?", [id]);
    if (check.length === 0) {
      return res.status(404).json({ message: "🚫 الشاحنة غير موجودة" });
    }

    await pool.execute("DELETE FROM Truck WHERE truck_id = ?", [id]);
    res.status(200).json({ message: "✅ تم حذف الشاحنة بنجاح" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ خطأ أثناء حذف الشاحنة" });
  }
});

// ✅ تعديل بيانات شاحنة
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { plate_number, driver_name, truck_name } = req.body;

  try {
    const [check] = await pool.execute("SELECT * FROM Truck WHERE truck_id = ?", [id]);
    if (check.length === 0) {
      return res.status(404).json({ message: "🚫 الشاحنة غير موجودة" });
    }

    await pool.execute(
      `UPDATE Truck 
       SET plate_number = ?, driver_name = ?, truck_name = ?
       WHERE truck_id = ?`,
      [plate_number, driver_name, truck_name, id]
    );

    res.status(200).json({ message: "✅ تم تعديل بيانات الشاحنة" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ خطأ أثناء تعديل الشاحنة" });
  }
});

module.exports = router;
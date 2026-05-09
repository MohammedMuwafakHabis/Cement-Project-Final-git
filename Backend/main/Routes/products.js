const express = require("express");
const router = express.Router();
const pool = require("../Database"); // افترض mysql2 pool

// ✅ [1] إضافة منتج جديد
router.post("/", async (req, res) => {
  try {
    const { product_name, price_per_ton } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO Product (product_name, price_per_ton)
       VALUES (?, ?)`,
      [product_name, price_per_ton]
    );

    res.status(201).send("✅ تم إضافة المنتج بنجاح");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ خطأ في إضافة المنتج");
  }
});

// ✅ [2] جلب كل المنتجات
router.get("/", async (req, res) => {
  try {
    const [products] = await pool.execute("SELECT * FROM Product");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ خطأ في جلب المنتجات");
  }
});

// ✅ [3] جلب منتج حسب ID
router.get("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;

    const [products] = await pool.execute(
      "SELECT * FROM Product WHERE product_id = ?",
      [product_id]
    );

    if (products.length === 0) {
      return res.status(404).send("❌ المنتج غير موجود");
    }

    res.json(products[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ خطأ في جلب المنتج");
  }
});

// ✅ [4] تعديل منتج
router.put("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const { product_name, price_per_ton } = req.body;

    const [result] = await pool.execute(
      `UPDATE Product
       SET product_name = ?, price_per_ton = ?
       WHERE product_id = ?`,
      [product_name, price_per_ton, product_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("❌ المنتج غير موجود");
    }

    res.send("✅ تم تعديل المنتج بنجاح");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ خطأ في تعديل المنتج");
  }
});

// ✅ [5] حذف منتج
router.delete("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;

    const [result] = await pool.execute(
      "DELETE FROM Product WHERE product_id = ?",
      [product_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("❌ المنتج غير موجود أو تم حذفه سابقًا");
    }

    res.send("✅ تم حذف المنتج بنجاح");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ خطأ في حذف المنتج");
  }
});

module.exports = router;
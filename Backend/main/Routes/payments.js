const express = require('express');
const router = express.Router();
const pool = require('../Database'); // mysql2

// ✅ إنشاء دفعة جديدة
router.post('/', async (req, res) => {
  try {
    const { load_id, amount, payment_method, payment_status, paid_at } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO Payment (load_id, amount, payment_method, payment_status, paid_at)
       VALUES (?, ?, ?, ?, ?)`,
      [load_id, amount, payment_method, payment_status, paid_at]
    );

    res.status(201).json({ message: "✅ تم إنشاء الدفعة بنجاح", payment_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ فشل في إنشاء الدفعة", details: error.message });
  }
});

// ✅ جلب كل الدفعات
router.get('/', async (req, res) => {
  try {
    const [payments] = await pool.execute(`SELECT * FROM Payment`);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "❌ فشل في جلب الدفعات" });
  }
});

// ✅ جلب دفعة واحدة
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [payments] = await pool.execute(`SELECT * FROM Payment WHERE payment_id = ?`, [id]);

    if (payments.length === 0) {
      return res.status(404).json({ message: "🚫 الدفعة غير موجودة" });
    }

    res.json(payments[0]);
  } catch (error) {
    res.status(500).json({ error: "❌ خطأ في جلب الدفعة" });
  }
});

// ✅ تعديل دفعة
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { load_id, amount, payment_method, payment_status, paid_at } = req.body;

    await pool.execute(
      `UPDATE Payment
       SET load_id = ?, amount = ?, payment_method = ?, payment_status = ?, paid_at = ?
       WHERE payment_id = ?`,
      [load_id, amount, payment_method, payment_status, paid_at, id]
    );

    res.json({ message: "✅ تم تعديل الدفعة بنجاح" });
  } catch (error) {
    res.status(500).json({ error: "❌ خطأ أثناء تعديل الدفعة", details: error.message });
  }
});

// ✅ حذف دفعة
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.execute(`DELETE FROM Payment WHERE payment_id = ?`, [id]);
    res.json({ message: "✅ تم حذف الدفعة" });
  } catch (error) {
    res.status(500).json({ error: "❌ خطأ أثناء حذف الدفعة" });
  }
});

// جلب طلب واحد بالرقم
router.get('/order/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const [orders] = await pool.execute(`SELECT * FROM Orders WHERE order_id = ?`, [orderId]);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    res.json({ success: true, order: orders[0] });
  } catch (err) {
    console.error('خطأ في جلب الطلب:', err);
    res.status(500).json({ success: false, message: 'خطأ في السيرفر', error: err.message });
  }
});

module.exports = router;
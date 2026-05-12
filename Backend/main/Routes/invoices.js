const express = require('express');
const router = express.Router();
const pool = require('../Database'); // mysql2

// ✅ إنشاء فاتورة
router.post('/', async (req, res) => {
  try {
    const { load_id, payment_id, invoice_date, total_amount } = req.body;

    await pool.execute(
      `INSERT INTO Invoice (load_id, payment_id, invoice_date, total_amount)
       VALUES (?, ?, ?, ?)`,
      [load_id, payment_id, invoice_date, total_amount]
    );

    res.status(201).json({ message: '✅ تم إنشاء الفاتورة بنجاح' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '❌ خطأ في إنشاء الفاتورة', details: error.message });
  }
});

// ✅ جلب كل الفواتير
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Invoice');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: '❌ خطأ في جلب الفواتير' });
  }
});

// ✅ جلب فاتورة واحدة حسب ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.execute('SELECT * FROM Invoice WHERE invoice_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '🚫 الفاتورة غير موجودة' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: '❌ خطأ في جلب الفاتورة' });
  }
});

// ✅ تعديل فاتورة
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { load_id, payment_id, invoice_date, total_amount } = req.body;

  try {
    await pool.execute(
      `UPDATE Invoice
       SET load_id = ?, payment_id = ?, invoice_date = ?, total_amount = ?
       WHERE invoice_id = ?`,
      [load_id, payment_id, invoice_date, total_amount, id]
    );

    res.json({ message: '✅ تم تعديل الفاتورة بنجاح' });
  } catch (error) {
    res.status(500).json({ error: '❌ خطأ أثناء تعديل الفاتورة', details: error.message });
  }
});

// ✅ حذف فاتورة
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await pool.execute('DELETE FROM Invoice WHERE invoice_id = ?', [id]);
    res.json({ message: '✅ تم حذف الفاتورة' });
  } catch (error) {
    res.status(500).json({ error: '❌ خطأ أثناء حذف الفاتورة', details: error.message });
  }
});

module.exports = router;
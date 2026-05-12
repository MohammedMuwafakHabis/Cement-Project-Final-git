const express = require('express');
const router = express.Router();
const pool = require('../Database'); // mysql2

// 🔹 جلب كل الطلبات بدون Pagination (للاختبار فقط)
router.get('/all', async (req, res) => {
  try {
    const [orders] = await pool.execute(`SELECT * FROM Orders ORDER BY order_date DESC`);
    res.json({ success: true, orders, totalOrders: orders.length });
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 🔹 جلب طلب واحد حسب ID
router.get('/:id', async (req, res) => {
  try {
    const idNum = Number(req.params.id);
    if (isNaN(idNum)) return res.status(400).json({ success: false, message: 'رقم الطلب غير صالح' });

    const [orders] = await pool.execute(
      `SELECT * FROM Orders WHERE order_id = ?`,
      [idNum]
    );

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
    }

    res.json({ success: true, order: orders[0] });
  } catch (err) {
    console.error('خطأ أثناء جلب الطلب:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 🔹 جلب طلبات عميل محدد مع Pagination
router.get('/customer/:customerId', async (req, res) => {
  try {
    const customerIdNum = Number(req.params.customerId);
    if (isNaN(customerIdNum)) return res.status(400).json({ success: false, message: 'Customer ID غير صالح' });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [orders] = await pool.execute(
      `SELECT * FROM Orders WHERE customer_id = ? ORDER BY order_date DESC LIMIT ${limit} OFFSET ${offset}`,
      [customerIdNum]
    );

    const [counts] = await pool.execute(
      `SELECT 
         COUNT(*) AS total,
         SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
         SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count,
         SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done_count
       FROM Orders
       WHERE customer_id = ?`,
      [customerIdNum]
    );

    const { total, new_count, in_progress_count, done_count } = counts[0];
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      orders,
      totalOrders: total,
      totalPages,
      counts: { new: new_count, in_progress: in_progress_count, done: done_count }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 🔹 إضافة طلب جديد
router.post('/', async (req, res) => {
  try {
    const {
      customer_id,
      cement_type,
      quantity,
      delivery_date,
      total_cost,
      truck_name,
      plate_number,
      driver_name
    } = req.body;

    if (!customer_id || !cement_type || !quantity || !delivery_date || !total_cost) {
      return res.status(400).json({ message: 'الرجاء تعبئة جميع الحقول المطلوبة' });
    }

    const customerIdNum = Number(customer_id);
    if (isNaN(customerIdNum)) return res.status(400).json({ success: false, message: 'Customer ID غير صالح' });

    const now = new Date();
    const [result] = await pool.execute(
      `INSERT INTO Orders (
         customer_id, cement_type, quantity, order_date, delivery_date,
         total_cost, status, invoice_id, created_at, updated_at,
         truck_name, plate_number, driver_name
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerIdNum, cement_type, quantity, now, delivery_date,
        total_cost, 'new', null, now, now,
        truck_name, plate_number, driver_name
      ]
    );

    res.status(201).json({ order_id: result.insertId });

  } catch (err) {
    console.error('خطأ أثناء إنشاء الطلب:', err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر', error: err.message });
  }
});

// 🔹 جلب كل الطلبات مع Pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;

    const [orders] = await pool.execute(
      `SELECT * FROM Orders ORDER BY order_date DESC LIMIT ${limit} OFFSET ${offset}`
    );

    const [countResult] = await pool.execute(`SELECT COUNT(*) AS total FROM Orders`);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({ success: true, orders, totalOrders: total, totalPages, currentPage: page });

  } catch (err) {
    console.error('Error fetching all orders with pagination:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// 🔹 البحث في الطلبات
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ success: true, orders: [] });

    const [orders] = await pool.execute(
      `SELECT *
       FROM Orders
       WHERE CAST(order_id AS CHAR) LIKE ?
          OR cement_type LIKE ?
          OR driver_name LIKE ?
          OR plate_number LIKE ?
       ORDER BY order_date DESC`,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    );

    res.json({ success: true, orders });

  } catch (error) {
    console.error("خطأ في البحث:", error);
    res.status(500).json({ success: false, message: "حدث خطأ في البحث", error: error.message });
  }
});

// 🔹 جلب طلبات عميل محدد مع Pagination
router.get('/customer/:customerId', async (req, res) => {
  try {
    const customerIdNum = Number(req.params.customerId);
    if (isNaN(customerIdNum)) return res.status(400).json({ success: false, message: 'Customer ID غير صالح' });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [orders] = await pool.execute(
      `SELECT * FROM Orders WHERE customer_id = ? ORDER BY order_date DESC LIMIT ? OFFSET ?`,
      [customerIdNum, Number(limit), Number(offset)]
    );

    const [counts] = await pool.execute(
      `SELECT 
         COUNT(*) AS total,
         SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
         SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count,
         SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done_count
       FROM Orders
       WHERE customer_id = ?`,
      [customerIdNum]
    );

    const { total, new_count, in_progress_count, done_count } = counts[0];
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      orders,
      totalOrders: total,
      totalPages,
      counts: { new: new_count, in_progress: in_progress_count, done: done_count }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
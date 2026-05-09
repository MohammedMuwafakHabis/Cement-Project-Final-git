const express = require('express');
const router = express.Router();
const pool = require('../Database'); // لاحظ التغيير
const bcrypt = require('bcryptjs');

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    // 1. التأكد من عدم وجود نفس الإيميل مسبقًا
    const [existing] = await pool.execute('SELECT * FROM Customer WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "هذا البريد مسجل مسبقًا" });
    }

    // 2. تشفير الباسورد
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. إدخال البيانات مع الباسورد المشفر
    const [result] = await pool.execute(
      'INSERT INTO Customer (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    res.status(201).json({ message: "Customer registered", customerId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// تسجيل دخول
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM Customer WHERE email = ?', [email.trim()]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'البريد الإلكتروني غير موجود' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      customerId: user.customer_id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

// جلب بيانات عميل معين
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Customer WHERE customer_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// جلب جميع العملاء
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Customer');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// تعديل بيانات العميل
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, phone } = req.body;
  try {
    await pool.execute('UPDATE Customer SET name = ?, phone = ? WHERE customer_id = ?', [name, phone, id]);
    res.status(200).json({ message: 'Customer updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// حذف العميل
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.execute('DELETE FROM Customer WHERE customer_id = ?', [id]);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
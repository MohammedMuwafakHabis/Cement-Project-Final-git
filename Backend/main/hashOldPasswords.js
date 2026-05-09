// hashOldPasswords_mysql.js
// تشغيل: node hashOldPasswords_mysql.js
// تجربة (بدون تحديث): node hashOldPasswords_mysql.js --dry-run

const bcrypt = require('bcryptjs');
const pool = require('./Database'); // mysql2 pool
const BCRYPT_SALT_ROUNDS = 10;
const DRY_RUN = process.argv.includes('--dry-run');

async function isLikelyHashed(password) {
  if (!password || typeof password !== 'string') return false;
  // bcrypt hashed strings usually start with $2a$, $2b$, $2y$ وطول ~60
  return (password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$')) && password.length >= 59;
}

async function hashOldPasswords() {
  console.log('🔎 بدء فحص كلمات المرور القديمة...');
  if (DRY_RUN) console.log('⚠️  العمل في وضع dry-run — لن يتم تطبيق تغييرات على قاعدة البيانات.');

  try {
    // جلب كل العملاء
    const [rows] = await pool.execute('SELECT customer_id, password FROM Customer');

    console.log(`ℹ️ تم جلب ${rows.length} عملاء.`);

    const toUpdate = [];

    for (const c of rows) {
      const { customer_id: id, password: pwd } = c;
      const hashed = await isLikelyHashed(pwd);
      if (!hashed) {
        toUpdate.push({ id, currentPassword: pwd });
      }
    }

    if (toUpdate.length === 0) {
      console.log('✅ لا توجد كلمات مرور تحتاج تشفير.');
      return;
    }

    console.log(`⚠️ عدد كلمات المرور التي ستُشفّر: ${toUpdate.length}`);

    for (const item of toUpdate) {
      const { id, currentPassword } = item;

      try {
        const newHashed = await bcrypt.hash(currentPassword, BCRYPT_SALT_ROUNDS);

        if (DRY_RUN) {
          console.log(`[DRY] سيتم تحديث ID=${id} → hashed (len=${newHashed.length})`);
          continue;
        }

        // تنفيذ التحديث
        await pool.execute(
          'UPDATE Customer SET password = ? WHERE customer_id = ?',
          [newHashed, id]
        );

        console.log(`🔐 تم تشفير وتحديث الباسورد للعميل ID=${id}`);
      } catch (err) {
        console.error(`❌ فشل تحديث ID=${id}:`, err.message || err);
      }
    }

    console.log('🎉 انتهى تشغيل السكربت.');
  } catch (err) {
    console.error('❌ خطأ عام أثناء التنفيذ:', err);
  } finally {
    process.exit(0);
  }
}

hashOldPasswords();
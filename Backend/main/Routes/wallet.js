const express = require('express');
const router = express.Router();
const pool = require('../Database'); // mysql2 pool

// ✅ إضافة رصيد للمحفظة
router.post('/:customer_id/add', async (req, res) => {
    const customer_id = req.params.customer_id;
    const { amount } = req.body;

    if (!amount || amount <= 0) return res.status(400).json({ message: 'Amount invalid' });

    try {
        // التحقق هل العميل لديه محفظة
        const [check] = await pool.execute(
            'SELECT * FROM CustomerWallets WHERE customer_id = ?',
            [customer_id]
        );

        let wallet_id;
        if (check.length === 0) {
            // إنشاء محفظة جديدة
            const [insertResult] = await pool.execute(
                'INSERT INTO CustomerWallets (customer_id, TotalBalance, LastUpdated) VALUES (?, ?, NOW())',
                [customer_id, amount]
            );
            wallet_id = insertResult.insertId;
        } else {
            // تحديث الرصيد في المحفظة
            await pool.execute(
                'UPDATE CustomerWallets SET TotalBalance = TotalBalance + ?, LastUpdated = NOW() WHERE customer_id = ?',
                [amount, customer_id]
            );
            wallet_id = check[0].WalletID;
        }

        // إضافة العملية لسجل المعاملات
        await pool.execute(
            'INSERT INTO WalletTransactions (WalletID, Type, Amount, Description, CreatedAt) VALUES (?, "credit", ?, ?, NOW())',
            [wallet_id, amount, 'Added by Admin']
        );

        res.json({ message: 'Balance added or updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ خصم رصيد من المحفظة
router.post('/:customer_id/charge', async (req, res) => {
    const customer_id = req.params.customer_id;
    const { amount } = req.body;

    if (!amount || amount <= 0) return res.status(400).json({ message: 'Amount invalid' });

    try {
        const [walletResult] = await pool.execute(
            'SELECT WalletID, TotalBalance FROM CustomerWallets WHERE customer_id = ?',
            [customer_id]
        );

        if (walletResult.length === 0) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const wallet = walletResult[0];
        if (wallet.TotalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // خصم الرصيد
        await pool.execute(
            'UPDATE CustomerWallets SET TotalBalance = TotalBalance - ?, LastUpdated = NOW() WHERE WalletID = ?',
            [amount, wallet.WalletID]
        );

        // إضافة عملية خصم
        await pool.execute(
            'INSERT INTO WalletTransactions (WalletID, Type, Amount, Description, CreatedAt) VALUES (?, "debit", ?, ?, NOW())',
            [wallet.WalletID, amount, 'Order payment']
        );

        res.json({ message: 'Amount charged successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ جلب رصيد المحفظة
router.get('/:customer_id', async (req, res) => {
    const customer_id = req.params.customer_id;
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM CustomerWallets WHERE customer_id = ?',
            [customer_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ جلب سجل العمليات للمحفظة
router.get('/:customer_id/transactions', async (req, res) => {
    const customer_id = req.params.customer_id;
    try {
        const [walletResult] = await pool.execute(
            'SELECT WalletID FROM CustomerWallets WHERE customer_id = ?',
            [customer_id]
        );

        if (walletResult.length === 0) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const wallet_id = walletResult[0].WalletID;

        const [transactions] = await pool.execute(
            'SELECT * FROM WalletTransactions WHERE WalletID = ? ORDER BY CreatedAt DESC',
            [wallet_id]
        );

        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
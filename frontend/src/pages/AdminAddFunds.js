// // src/pages/AdminAddFunds.js
// import React, { useState, useRef } from 'react';
// import API_BASE_URL from '../config';

// export default function AdminAddFunds() {
//   const [customerId, setCustomerId] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [currentBalance, setCurrentBalance] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');
//   const messageTimeoutRef = useRef(null);

//   // جلب بيانات العميل ورصيده
//   const fetchCustomer = async (id) => {
//     setCustomerName('');
//     setCurrentBalance(null);
//     // لا تمسح الرسالة هنا حتى لو تغير العميل، عشان ما تختفي الرسالة المفيدة
//     if (!id) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/customers/${id}`);
//       if (!res.ok) {
//         if (res.status === 404) setMessage('❌ العميل غير موجود');
//         else setMessage('❌ فشل جلب بيانات العميل');
//         return;
//       }
//       const data = await res.json();
//       setCustomerName(data.name || `${data.customer_id}`);

//       const walletRes = await fetch(`${API_BASE_URL}/wallet/${id}`);
//       if (walletRes.ok) {
//         const walletData = await walletRes.json();
//         setCurrentBalance(walletData.totalBalance ?? walletData.balance ?? walletData.TotalBalance ?? 0);
//       } else {
//         setCurrentBalance(0);
//       }

//     } catch (err) {
//       console.error('fetchCustomer error:', err);
//       setMessage('❌ خطأ في الاتصال بالسيرفر');
//     }
//   };

//   const handleCheckCustomer = (e) => {
//     const id = e.target.value;
//     setCustomerId(id);
//     if (!id || Number.isNaN(Number(id))) {
//       setCustomerName('');
//       setCurrentBalance(null);
//       return;
//     }
//     fetchCustomer(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // الغاء المؤقت القديم إذا كان موجود
//     if (messageTimeoutRef.current) {
//       clearTimeout(messageTimeoutRef.current);
//       messageTimeoutRef.current = null;
//     }

//     if (!customerId) {
//       setMessage('أدخل customer_id');
//       return;
//     }
//     if (!amount || Number(amount) <= 0) {
//       setMessage('أدخل مبلغ صالح');
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-admin-password': 'supersecret123'
//         },
//         body: JSON.stringify({ amount: Number(amount) })
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(`❌ ${data.message || data.error || 'فشل الإضافة'}`);
//         return;
//       }

//       setMessage(`✅ تمت إضافة مبلغ ${Number(amount).toLocaleString()} ريال إلى رصيد العميل ${customerName}`);
//       setAmount('');
//       fetchCustomer(customerId);

//       messageTimeoutRef.current = setTimeout(() => {
//         setMessage('');
//         messageTimeoutRef.current = null;
//       }, 4000);

//     } catch (err) {
//       console.error('handleSubmit error:', err);
//       setMessage('❌ خطأ في الاتصال بالسيرفر');
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 520, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
//       <h2>Admin — إضافة رصيد للمحفظة</h2>

//       <div style={{ marginBottom: 12 }}>
//         <label style={{ display: 'block', marginBottom: 6 }}>customer_id</label>
//         <input
//           type="text"
//           value={customerId}
//           onChange={handleCheckCustomer}
//           placeholder="ادخل رقم العميل ثم انتظر لعرض اسمه ورصيده"
//           style={{ padding: 8, width: '100%' }}
//         />
//         {customerName && (
//           <div style={{ marginTop: 8, color: '#333' }}>
//             اسم العميل: <strong>{customerName}</strong>
//           </div>
//         )}
//         {currentBalance !== null && (
//           <div style={{ marginTop: 8, color: '#007bff', fontWeight: 'bold' }}>
//             الرصيد الحالي: {Number(currentBalance).toLocaleString()} ريال
//           </div>
//         )}
//       </div>

//       <div style={{ marginBottom: 12 }}>
//         <label style={{ display: 'block', marginBottom: 6 }}>المبلغ (ريال)</label>
//         <input
//           type="number"
//           step="0.01"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="مثال: 150.50"
//           style={{ padding: 8, width: '100%' }}
//         />
//       </div>

//       <div style={{ marginTop: 8 }}>
//         <button
//           onClick={handleSubmit}
//           style={{ padding: '10px 14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}
//         >
//           أضف رصيد
//         </button>
//       </div>

//       {message && <div style={{ marginTop: 14, fontWeight: 600 }}>{message}</div>}

//       <div style={{ marginTop: 18, fontSize: 13, color: '#666' }}>
//         ملاحظة: تأكد أن الـ backend يقبل إضافة الرصيد (قد يتطلب هيدر x-admin-password حسب إعداداتك).
//       </div>
//     </div>
//   );
// }





// // src/pages/AdminAddFunds.js
// import React, { useState, useRef } from 'react';
// import API_BASE_URL from '../config';
// import addFundsBg from './images/addfunds2.jpg'; // ✅ background image

// export default function AdminAddFunds() {
//   const [customerId, setCustomerId] = useState('');
//   const [customerName, setCustomerName] = useState('');
//   const [currentBalance, setCurrentBalance] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');
//   const messageTimeoutRef = useRef(null);

//   const fetchCustomer = async (id) => {
//     setCustomerName('');
//     setCurrentBalance(null);
//     if (!id) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/customers/${id}`);
//       if (!res.ok) {
//         setMessage(res.status === 404 ? '❌ العميل غير موجود' : '❌ فشل جلب بيانات العميل');
//         return;
//       }
//       const data = await res.json();
//       setCustomerName(data.name || `${data.customer_id}`);

//       const walletRes = await fetch(`${API_BASE_URL}/wallet/${id}`);
//       if (walletRes.ok) {
//         const walletData = await walletRes.json();
//         setCurrentBalance(walletData.totalBalance ?? walletData.balance ?? 0);
//       } else {
//         setCurrentBalance(0);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ خطأ في الاتصال بالسيرفر');
//     }
//   };

//   const handleCheckCustomer = (e) => {
//     const id = e.target.value;
//     setCustomerId(id);
//     if (!id || Number.isNaN(Number(id))) {
//       setCustomerName('');
//       setCurrentBalance(null);
//       return;
//     }
//     fetchCustomer(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);

//     if (!customerId) return setMessage('أدخل customer_id');
//     if (!amount || Number(amount) <= 0) return setMessage('أدخل مبلغ صالح');

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-admin-password': 'supersecret123',
//         },
//         body: JSON.stringify({ amount: Number(amount) }),
//       });

//       const data = await res.json();
//       if (!res.ok) return setMessage(`❌ ${data.message || 'فشل الإضافة'}`);

//       setMessage(`✅ تمت إضافة مبلغ ${Number(amount).toLocaleString()} ريال إلى ${customerName}`);
//       setAmount('');
//       fetchCustomer(customerId);

//       messageTimeoutRef.current = setTimeout(() => setMessage(''), 4000);
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ خطأ في الاتصال بالسيرفر');
//     }
//   };

//   // ✅ Full-page background + centered card
//   const pageStyle = {
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center', // أفقيًا في المنتصف
//     alignItems: 'center', // عموديًا في المنتصف
//     backgroundImage: `url(${addFundsBg})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//   };

//   const cardStyle = {
//     backgroundColor: 'rgba(255, 255, 255, 0.85)',
//     padding: 24,
//     borderRadius: 10,
//     maxWidth: 520,
//     width: '90%',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
//     fontFamily: 'Arial, sans-serif',
//     textAlign: 'center',
//   };

//   return (
//     <div style={pageStyle}>
//       <div style={cardStyle}>
//         <h2>Admin — إضافة رصيد للمحفظة</h2>

//         <div style={{ marginBottom: 12 }}>
//           <label style={{ display: 'block', marginBottom: 6 }}>customer_id</label>
//           <input
//             type="text"
//             value={customerId}
//             onChange={handleCheckCustomer}
//             placeholder="ادخل رقم العميل ثم انتظر لعرض اسمه ورصيده"
//             style={{
//               padding: 8,
//               width: '80%',
//               border: '1px solid #ccc',
//               borderRadius: 4,
//             }}
//           />
//           {customerName && (
//             <div style={{ marginTop: 8 }}>
//               اسم العميل: <strong>{customerName}</strong>
//             </div>
//           )}
//           {currentBalance !== null && (
//             <div style={{ marginTop: 8, color: '#007bff', fontWeight: 'bold' }}>
//               الرصيد الحالي: {Number(currentBalance).toLocaleString()} ريال
//             </div>
//           )}
//         </div>

//         <div style={{ marginBottom: 12 }}>
//           <label style={{ display: 'block', marginBottom: 6 }}>المبلغ (ريال)</label>
//           <input
//             type="number"
//             step="0.01"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="مثال: 150.50"
//             style={{
//               padding: 8,
//               width: '80%',
//               border: '1px solid #ccc',
//               borderRadius: 4,
//             }}
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           style={{
//             padding: '10px 16px',
//             background: '#053b74ff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: 6,
//             cursor: 'pointer',
//             fontWeight: 'bold',
//           }}
//         >
//           أضف رصيد
//         </button>

//         {message && <div style={{ marginTop: 14, fontWeight: 600 }}>{message}</div>}

//         <div style={{ marginTop: 18, fontSize: 13, color: '#333' }}>
//           ملاحظة: تأكد أن الـ backend يقبل إضافة الرصيد (قد يتطلب هيدر x-admin-password حسب إعداداتك).
//         </div>
//       </div>
//     </div>
//   );
// }




// src/pages/AdminAddFunds.js
import React, { useState, useRef } from 'react';
import API_BASE_URL from '../config.js';

export default function AdminAddFunds() {
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [currentBalance, setCurrentBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);

  // جلب بيانات العميل ورصيده
  const fetchCustomer = async (id) => {
    setCustomerName('');
    setCurrentBalance(null);
    if (!id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/customers/${id}`);
      if (!res.ok) {
        if (res.status === 404) setMessage('❌ العميل غير موجود');
        else setMessage('❌ فشل جلب بيانات العميل');
        return;
      }
      const data = await res.json();
      setCustomerName(data.name || `${data.customer_id}`);

      const walletRes = await fetch(`${API_BASE_URL}/wallet/${id}`);
      if (walletRes.ok) {
        const walletData = await walletRes.json();
        setCurrentBalance(walletData.totalBalance ?? walletData.balance ?? walletData.TotalBalance ?? 0);
      } else {
        setCurrentBalance(0);
      }

    } catch (err) {
      console.error('fetchCustomer error:', err);
      setMessage('❌ خطأ في الاتصال بالسيرفر');
    }
  };

  const handleCheckCustomer = (e) => {
    const id = e.target.value;
    setCustomerId(id);
    if (!id || Number.isNaN(Number(id))) {
      setCustomerName('');
      setCurrentBalance(null);
      return;
    }
    fetchCustomer(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }

    if (!customerId) {
      setMessage('أدخل customer_id');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setMessage('أدخل مبلغ صالح');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': 'supersecret123'
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || data.error || 'فشل الإضافة'}`);
        return;
      }

      setMessage(`✅ تمت إضافة مبلغ ${Number(amount).toLocaleString()} ريال إلى رصيد العميل ${customerName}`);
      setAmount('');
      fetchCustomer(customerId);

      messageTimeoutRef.current = setTimeout(() => {
        setMessage('');
        messageTimeoutRef.current = null;
      }, 4000);

    } catch (err) {
      console.error('handleSubmit error:', err);
      setMessage('❌ خطأ في الاتصال بالسيرفر');
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('src/pages/images/cementera-Payment-page.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Cairo", sans-serif',
      }}
    >
      {/* تراكب شفاف فوق الصورة */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.83)',
          borderRadius: 16,
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          padding: '40px 35px',
          maxWidth: 520,
          width: '90%',
          textAlign: 'right',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#003064ff',
            marginBottom: 25,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          💰   إضافة رصيد للمحفظة
        </h2>

        {/* إدخال العميل */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: '#222' }}>
            رقم العميل (customer_id)
          </label>
          <input
            type="text"
            value={customerId}
            onChange={handleCheckCustomer}
            placeholder="ادخل رقم العميل ثم انتظر لعرض البيانات"
            style={{
              width: '100%',
              padding: 12,
              border: '1px solid #ccc',
              borderRadius: 8,
              fontSize: 15,
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #002752ff')}
            onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
          />
          {customerName && (
            <div style={{ marginTop: 8, color: '#333' }}>
              اسم العميل: <strong>{customerName}</strong>
            </div>
          )}
          {currentBalance !== null && (
            <div style={{ marginTop: 8, color: '#008628ff', fontWeight: 'bold' }}>
              الرصيد الحالي: {Number(currentBalance).toLocaleString()} ريال
            </div>
          )}
        </div>

        {/* المبلغ */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 'bold', color: '#222' }}>
            المبلغ (ريال)
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مثال: 150.50"
            style={{
              width: '100%',
              padding: 12,
              border: '1px solid #ccc',
              borderRadius: 8,
              fontSize: 15,
              outline: 'none',
              transition: '0.3s',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #007bff')}
            onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
          />
        </div>

        {/* الزر */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: '#003063ff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: 13,
            fontSize: 17,
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#003063ff')}
        >
           أضف المبلغ الى الرصيد
        </button>

        {/* الرسالة */}
        {message && (
          <div
            style={{
              marginTop: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              color: message.includes('✅') ? 'green' : 'red',
            }}
          >
            {message}
          </div>
        )}

        <p
          style={{
            marginTop: 22,
            fontSize: 13,
            color: '#555',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
        
        </p>
      </div>
    </div>
  );
}

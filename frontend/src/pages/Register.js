// //Register.js

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';
// import API_BASE_URL from '../config'; // ← استدعاء الرابط
// import { useTranslation } from "react-i18next";



// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_BASE_URL}/customers/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, email, password, phone })
//       });

//       if (!res.ok) {
//         throw new Error('فشل في إنشاء الحساب');
//       }

//       const data = await res.json();
//       alert(`✅ تم إنشاء الحساب بنجاح. ID: ${data.customerId}`);
      
//       // التوجيه لصفحة تسجيل الدخول بعد رسالة التأكيد
//       navigate('/login');

//     } catch (error) {
//       console.error(error);
//       alert("❌ تعذر الاتصال بالخادم. تأكد أن السيرفر شغال.");
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-box">
//         <h2> Create Account</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name "
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <button type="submit">Submit </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import API_BASE_URL from '../config.js'; 
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation(); // ← استدعاء الترجمة
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/customers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone })
      });

      if (!res.ok) {
        throw new Error(t('register.fail'));
      }

      const data = await res.json();
      alert(t('register.success', { customerId: data.customerId }));
      
      navigate('/login');

    } catch (error) {
      console.error(error);
      alert(t('register.fail'));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>{t('register.title')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('register.fullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t('register.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t('register.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder={t('register.phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">{t('register.submit')}</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

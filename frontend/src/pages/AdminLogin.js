// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AdminLogin() {
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const adminPassword = 'admin123'; // الباسورد الصحيح

//     if (password === adminPassword) {
//       // تخزين حالة الدخول
//       localStorage.setItem('isAdmin', 'true');
//       setMessage('');
//       // توجيه إلى صفحة إدارة الأدمن
//      window.location.href = '/admin/manage';

//     } else {
//       setMessage('❌ كلمة المرور غير صحيحة');
//       localStorage.removeItem('isAdmin');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
//       <h2>تسجيل دخول الأدمن</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="أدخل كلمة المرور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ padding: 8, width: '100%', marginBottom: 12 }}
//         />
//         <button type="submit" style={{ padding: '10px 14px', width: '100%' }}>
//           دخول
//         </button>
//       </form>
//       {message && <p style={{ color: 'red', marginTop: 12 }}>{message}</p>}
//     </div>
//   );
// }



import React, { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminPassword = 'admin123'; // الباسورد الصحيح

    if (password === adminPassword) {
      // تخزين حالة الدخول
      localStorage.setItem('isAdmin', 'true');
      setMessage('');
      // توجيه إلى صفحة إدارة الأدمن
      window.location.href = '/admin/manage';
    } else {
      setMessage('❌ كلمة المرور غير صحيحة');
      localStorage.removeItem('isAdmin');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h2 style={{ color: "white" }}>تسجيل دخول الأدمن</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="أدخل كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8, width: '95%', marginBottom: 12, }}
        />
        <button type="submit" style={{ padding: '10px 14px', width: '100%' }}>
          دخول
        </button>
      </form>
      {message && <p style={{ color: 'red', marginTop: 12 }}>{message}</p>}
    </div>
  );
}

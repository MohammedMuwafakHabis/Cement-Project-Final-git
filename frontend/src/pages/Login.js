// // src/pages/Login.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css"; // تأكد من وجود هذا الملف

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   console.log("🟡 محاولة تسجيل الدخول...");

//   try {
//     const res = await fetch("http://localhost:4000/customers/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     console.log("🟢 تم إرسال الطلب - بانتظار الرد");

//     const data = await res.json();
//     console.log("🔵 البيانات المستلمة من السيرفر:", data);

//     if (res.ok) {
//      localStorage.setItem("customerId", data.customerId);
//      localStorage.setItem("customerName", data.name);

//       console.log("✅ تسجيل الدخول ناجح! جاري التوجيه...");
//       navigate("/dashboard");
//     } else {
//       console.log("❌ فشل تسجيل الدخول:", data.error);
//       alert(data.error || "فشل تسجيل الدخول");
//     }
//   } catch (error) {
//     console.error("🔥 حدث خطأ أثناء الاتصال بالسيرفر:", error);
//     alert("حدث خطأ أثناء الاتصال بالسيرفر");
//   }
// };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:4000/customers/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("customerId", data.customerId);
//         localStorage.setItem("customerName", data.name);

//         // تأخير بسيط للتأكد من حفظ البيانات قبل التنقل
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 100);
//       } else {
//         alert(data.error || "فشل تسجيل الدخول");
//       }
//     } catch (error) {
//       alert("حدث خطأ أثناء الاتصال بالسيرفر");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:4000/customers/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("customerId", data.customerId);
//         localStorage.setItem("customerName", data.name);
//         setIsLoggedIn(true); // مهم جداً لتحديث حالة الدخول في App.js
//         navigate("/dashboard");
//       } else {
//         alert(data.error || "فشل تسجيل الدخول");
//       }
//     } catch (error) {
//       alert("حدث خطأ أثناء الاتصال بالسيرفر");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:4000/customers/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("customerId", data.customerId);
//         localStorage.setItem("customerName", data.name);
//         navigate("/dashboard");
//       } else {
//         alert(data.error || "فشل تسجيل الدخول");
//       }
//     } catch (error) {
//       alert("حدث خطأ أثناء الاتصال بالسيرفر");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




// // Login.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:4000/customers/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("customerId", data.customerId);
//         localStorage.setItem("customerName", data.name);
//         setIsLoggedIn(true); // ✅ مهم للتحديث المباشر
//         navigate("/dashboard");
//       } else {
//         alert(data.error || "فشل تسجيل الدخول");
//       }
//     } catch (error) {
//       alert("حدث خطأ أثناء الاتصال بالسيرفر");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p style={{ marginTop: "10px" }}>
//           <Link to="/forgot-password">Forgot your password?</Link>
//         </p>

//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






// // src/pages/Login.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // التحقق البسيط على الفرونت
//     if (!email || !password) {
//       alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
//       return;
//     }
//     // مثلاً تحقق أن الإيميل بصيغة صحيحة
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert("يرجى إدخال بريد إلكتروني صالح");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/customers/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.trim(), password: password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("customerId", data.customerId);
//         localStorage.setItem("customerName", data.name);
//         setIsLoggedIn(true);
//         navigate("/dashboard");
//       } else {
//         alert(data.error || "فشل تسجيل الدخول");
//       }
//     } catch (error) {
//       alert("حدث خطأ أثناء الاتصال بالسيرفر");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>
//         <form onSubmit={handleLogin}>
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
//           <button type="submit">Click here to login</button>
//         </form>
//         <p style={{ marginTop: "10px" }}>
//           <Link to="/forgot-password">Forgot your password?</Link>
//         </p>
//         <p>
//           Don't have an account?
//           <Link to="/register"> Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Auth.css";

const Login = ({ setIsLoggedIn }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(t("login.alerts.emptyFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert(t("login.alerts.invalidEmail"));
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("customerId", data.customerId);
        localStorage.setItem("customerName", data.name);
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert(data.error || t("login.alerts.loginFailed"));
      }
    } catch (error) {
      alert(t("login.alerts.serverError"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{t("login.title")}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{t("login.button")}</button>
        </form>
        <p style={{ marginTop: "10px" }}>
          <Link to="/forgot-password">{t("login.forgotPassword")}</Link>
        </p>
        <p>
          {t("login.noAccount")}
          <Link to="/register"> {t("login.createAccount")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

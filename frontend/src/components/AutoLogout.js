// // src/components/AutoLogout.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 دقيقة

// const AutoLogout = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeout;

//     const resetTimeout = () => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         localStorage.clear();
//         setIsLoggedIn(false);
//         navigate("/login");
//         alert("تم تسجيل خروجك تلقائياً بسبب عدم النشاط");
//       }, AUTO_LOGOUT_TIME);
//     };

//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keydown", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     resetTimeout();

//     return () => {
//       if (timeout) clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, [navigate, setIsLoggedIn]);

//   return null;
// };

// export default AutoLogout;


// // src/components/AutoLogout.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AUTO_LOGOUT_TIME = 5 * 1000; // 30 دقيقة (تقدر تغيّر الوقت هنا)

// const AutoLogout = ({ setIsLoggedIn, redirectTo = "/login", extraClear = () => {} }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeout;

//     const resetTimeout = () => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         localStorage.clear();
//         extraClear(); // لو فيه بيانات إضافية نبغا نمسحها (مثل isAdmin)
//         if (setIsLoggedIn) setIsLoggedIn(false);
//         navigate(redirectTo);
//         alert("تم تسجيل خروجك تلقائيًا بسبب عدم النشاط");
//       }, AUTO_LOGOUT_TIME);
//     };

//     // مراقبة النشاط
//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keydown", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     resetTimeout(); // نفعّل التايمر أول ما يدخل الصفحة

//     return () => {
//       if (timeout) clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, [navigate, setIsLoggedIn, redirectTo, extraClear]);

//   return null;
// };

// export default AutoLogout;



// // src/components/AutoLogout.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AUTO_LOGOUT_TIME = 5  * 1000; // 5 ثواني فقط للتجربة، غيّرها لاحقًا

// const AutoLogout = ({ setIsLoggedIn, redirectTo = "/login", extraClear = () => {} }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeout;

//     const isUserLoggedIn = () => {
//       // يتحقق إذا المستخدم مسجل دخول فعليًا
//       return localStorage.getItem("customerId") || localStorage.getItem("isAdmin") === "true";
//     };

//     const resetTimeout = () => {
//       if (!isUserLoggedIn()) return; // ⛔ لا تشغل المؤقت إذا ما فيه دخول

//       if (timeout) clearTimeout(timeout);

//       timeout = setTimeout(() => {
//         if (!isUserLoggedIn()) return; // تحقق مرة ثانية قبل تنفيذ الطرد

//         localStorage.clear();
//         extraClear(); // حذف بيانات إضافية مثل isAdmin

//         if (setIsLoggedIn) setIsLoggedIn(false);

//         navigate(redirectTo);
//         alert("تم تسجيل خروجك تلقائيًا بسبب عدم النشاط");
//       }, AUTO_LOGOUT_TIME);
//     };

//     // متابعة الأحداث
//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keydown", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     resetTimeout(); // نبدأ التايمر عند الدخول

//     return () => {
//       if (timeout) clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, [navigate, setIsLoggedIn, redirectTo, extraClear]);

//   return null;
// };

// export default AutoLogout;



// // src/components/AutoLogout.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AUTO_LOGOUT_TIME = 5 * 1000; // 5 دقائق

// const AutoLogout = ({ setIsLoggedIn, redirectTo, extraClear = () => {} }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timeout;

//     const isUserLoggedIn = () => {
//       return (
//         localStorage.getItem("customerId") ||
//         localStorage.getItem("isAdmin") === "true"
//       );
//     };

//     const getRedirectPath = () => {
//       if (redirectTo) return redirectTo;

//       const isAdmin = localStorage.getItem("isAdmin") === "true";
//       return isAdmin ? "/admin" : "/login";
//     };

//     const resetTimeout = () => {
//       if (!isUserLoggedIn()) return;

//       if (timeout) clearTimeout(timeout);

//       timeout = setTimeout(() => {
//         if (!isUserLoggedIn()) return;

//         localStorage.clear();
//         extraClear();

//         if (setIsLoggedIn) setIsLoggedIn(false);

//         navigate(getRedirectPath());
//         alert("تم تسجيل خروجك تلقائيًا بسبب عدم النشاط");
//       }, AUTO_LOGOUT_TIME);
//     };

//     // 🖱️ متابعة النشاط
//     window.addEventListener("mousemove", resetTimeout);
//     window.addEventListener("keydown", resetTimeout);
//     window.addEventListener("click", resetTimeout);
//     window.addEventListener("scroll", resetTimeout);

//     resetTimeout();

//     return () => {
//       if (timeout) clearTimeout(timeout);
//       window.removeEventListener("mousemove", resetTimeout);
//       window.removeEventListener("keydown", resetTimeout);
//       window.removeEventListener("click", resetTimeout);
//       window.removeEventListener("scroll", resetTimeout);
//     };
//   }, [navigate, setIsLoggedIn, redirectTo, extraClear]);

//   return null;
// };

// export default AutoLogout;


// src/components/AutoLogout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ⏰ 5 دقائق (بدل 5 ثواني)
const AUTO_LOGOUT_TIME = 5  * 60 *1000;

const AutoLogout = ({ setIsLoggedIn, redirectTo, extraClear = () => {} }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    const isUserLoggedIn = () => {
      return (
        localStorage.getItem("customerId") ||
        localStorage.getItem("isAdmin") === "true"
      );
    };

    const getRedirectPath = () => {
      if (redirectTo) return redirectTo;
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      return isAdmin ? "/admin" : "/admin";
    };

    const resetTimeout = () => {
      if (!isUserLoggedIn()) return;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (!isUserLoggedIn()) return;

        localStorage.clear();
        extraClear();

        if (setIsLoggedIn) setIsLoggedIn(false);

        // ✅ توجيه بعد انتهاء الجلسة
        navigate(getRedirectPath());
        alert("تم تسجيل خروجك تلقائيًا بسبب عدم النشاط");
      }, AUTO_LOGOUT_TIME);
    };

    // 🖱️ مراقبة النشاط
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("scroll", resetTimeout);

    resetTimeout();

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoggedIn, redirectTo, extraClear]); // ✅ حذف navigate من التبعيات لتفادي التحذير

  return null;
};

export default AutoLogout;

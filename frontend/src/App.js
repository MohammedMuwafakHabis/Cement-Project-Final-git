// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // صفحات العميل
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// // صفحات الأدمن
// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// // صفحة دخول الشاحنات (البوابة)
// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";  // استوردها هنا

// function App() {
//   const isLoggedIn = Boolean(localStorage.getItem("customerId"));
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* صفحات الدخول */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* صفحات العميل */}
//         <Route
//           path="/dashboard"
//           element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/new-order"
//           element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/payment"
//           element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/barcode"
//           element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/orders"
//           element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//         />

//         {/* صفحات الأدمن */}
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route
//           path="/admin/manage"
//           element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//         />
//         <Route
//           path="/admin/add-funds"
//           element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//         />

//         {/* صفحة دخول الشاحنات */}
//         <Route path="/gate" element={<TruckEntry />} />

//         {/* صفحة تحميل الشاحنة */}
//         <Route path="/truck-load" element={<TruckLoad />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// // صفحات العميل
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// // صفحات الأدمن
// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// // صفحة دخول الشاحنات (البوابة)
// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";

// function App() {
//   const isLoggedIn = Boolean(localStorage.getItem("customerId"));
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* صفحات الدخول */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* صفحات العميل */}
//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           {/* صفحات الأدمن */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           {/* صفحة دخول الشاحنات */}
//           <Route path="/gate" element={<TruckEntry />} />

//           {/* صفحة تحميل الشاحنة */}
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;





// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   useEffect(() => {
//     const customerId = localStorage.getItem("customerId");
//     setIsLoggedIn(Boolean(customerId));
//   }, []);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* صفحات الدخول */}
//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/register" element={<Register />} />

//           {/* صفحات العميل */}
//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           {/* صفحات الأدمن */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           {/* صفحة دخول الشاحنات */}
//           <Route path="/gate" element={<TruckEntry />} />

//           {/* صفحة تحميل الشاحنة */}
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   useEffect(() => {
//     const customerId = localStorage.getItem("customerId");
//     setIsLoggedIn(Boolean(customerId));
//   }, []);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* صفحات الدخول */}
//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/register" element={<Register />} />

//           {/* صفحات العميل */}
//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           {/* صفحات الأدمن */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           {/* صفحة دخول الشاحنات */}
//           <Route path="/gate" element={<TruckEntry />} />

//           {/* صفحة تحميل الشاحنة */}
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;





// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";

// function App() {
//   const isLoggedIn = Boolean(localStorage.getItem("customerId")); // نستخدم localStorage مباشرة
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* صفحات الدخول */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* صفحات العميل */}
//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           {/* صفحات الأدمن */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           {/* صفحة دخول الشاحنات */}
//           <Route path="/gate" element={<TruckEntry />} />

//           {/* صفحة تحميل الشاحنة */}
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;




// // App.js
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("customerId"));
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   // تحديث حالة تسجيل الدخول عند تغيّر localStorage
//   useEffect(() => {
//     const checkLogin = () => {
//       const customerId = localStorage.getItem("customerId");
//       setIsLoggedIn(!!customerId);
//     };

//     window.addEventListener("storage", checkLogin);
//     return () => window.removeEventListener("storage", checkLogin);
//   }, []);

//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           <Route path="/gate" element={<TruckEntry />} />
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;








// // App.js
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Layout from './components/Layout';

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NewOrder from "./pages/NewOrder";
// import Payment from "./pages/Payment";
// import BarcodePage from "./pages/BarcodePage";
// import Orders from "./pages/Orders";

// import AdminLogin from './pages/AdminLogin';
// import AdminManage from './pages/AdminManage';
// import AdminAddFunds from './pages/AdminAddFunds';

// import TruckEntry from "./pages/TruckEntry";
// import TruckLoad from "./pages/TruckLoad";

// import AutoLogout from './components/AutoLogout';  // استيراد AutoLogout

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("customerId"));
//   const isAdmin = localStorage.getItem("isAdmin") === "true";

//   // تحديث حالة تسجيل الدخول عند تغيّر localStorage
//   useEffect(() => {
//     const checkLogin = () => {
//       const customerId = localStorage.getItem("customerId");
//       setIsLoggedIn(!!customerId);
//     };

//     window.addEventListener("storage", checkLogin);
//     return () => window.removeEventListener("storage", checkLogin);
//   }, []);

//   return (
//     <Router>
//       <Layout>
//         {/* أضف AutoLogout فقط لو المستخدم مسجل دخول */}
//         {isLoggedIn && <AutoLogout setIsLoggedIn={setIsLoggedIn} />}

//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/dashboard"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/new-order"
//             element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/payment"
//             element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/barcode"
//             element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/orders"
//             element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
//           />

//           <Route path="/admin" element={<AdminLogin />} />
//           <Route
//             path="/admin/manage"
//             element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
//           />
//           <Route
//             path="/admin/add-funds"
//             element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
//           />

//           <Route path="/gate" element={<TruckEntry />} />
//           <Route path="/truck-load" element={<TruckLoad />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;



// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from './components/Layout';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewOrder from "./pages/NewOrder";
import Payment from "./pages/Payment";
import BarcodePage from "./pages/BarcodePage";
import Orders from "./pages/Orders";

import AdminLogin from './pages/AdminLogin';
import AdminManage from './pages/AdminManage';
import AdminAddFunds from './pages/AdminAddFunds';

import TruckEntry from "./pages/TruckEntry";
import TruckLoad from "./pages/TruckLoad";

import AutoLogout from './components/AutoLogout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("customerId"));
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const checkLogin = () => {
      const customerId = localStorage.getItem("customerId");
      setIsLoggedIn(!!customerId);
    };

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  return (
    <Router>
      <Layout>
        {/* AutoLogout للعميل */}
        {isLoggedIn && (
          <AutoLogout
            setIsLoggedIn={setIsLoggedIn}
            redirectTo="/login"
          />
        )}

        {/* AutoLogout للأدمن (منفصل) */}
        {isAdmin && !isLoggedIn && (
          <AutoLogout
            redirectTo="/admin"
            extraClear={() => localStorage.removeItem("isAdmin")}
          />
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/new-order"
            element={isLoggedIn ? <NewOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment"
            element={isLoggedIn ? <Payment /> : <Navigate to="/login" />}
          />
          <Route
            path="/barcode"
            element={isLoggedIn ? <BarcodePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/manage"
            element={isAdmin ? <AdminManage /> : <Navigate to="/admin" />}
          />
          <Route
            path="/admin/add-funds"
            element={isAdmin ? <AdminAddFunds /> : <Navigate to="/admin" />}
          />

          <Route path="/gate" element={<TruckEntry />} />
          <Route path="/truck-load" element={<TruckLoad />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

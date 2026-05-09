// // src/components/Layout.js
// import React from 'react';
// import logo from '../pages/images/logo.png';
// import { useLocation } from 'react-router-dom';
// import BackButton from './BackButton';

// export default function Layout({ children }) {
//   const location = useLocation();

//   // صفحات لا يظهر فيها زر الرجوع
//   const hideBackOn = ["/login", "/register", "/dashboard", "/admin", "/admin/manage"];

//   console.log("📍 Current path:", location.pathname); // للتأكد في الكونسول

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" , }}>
//       {/* رأس الصفحة */}
//     <header
//   style={{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '1rem 2rem',
//     borderBottom: '1px solid #ddd',
//     backgroundColor: "#2c3e50a8", // هذا لون خلفية الهيدر/اللوجو
//     position: 'sticky',
//     top: 0,
//     zIndex: 100,
//   }}
// >
//   {/* الزر */}
//   {!hideBackOn.includes(location.pathname) ? (
//     <BackButton label="رجوع" />
//   ) : (
//     <div style={{ color: 'gray' }}></div>
//   )}

//   {/* اللوجو مع صندوق خلفه */}
//   <div style={{ backgroundColor: '#fdfdfd59', padding: '5px', borderRadius: '5px' }}>
//     <img src={logo} alt="شعار الشركة" style={{ height: '50px' }} />
//   </div>
// </header>


//       {/* المحتوى */}
//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }






// // src/components/Layout.js
// import React from "react";
// import logo from "../pages/images/logo.png"; // تأكد أن المسار صحيح
// import { useLocation, useNavigate } from "react-router-dom";
// import BackButton from "./BackButton";

// export default function Layout({ children }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // صفحات لا يظهر فيها زر الرجوع
//   const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];

//   // زر تسجيل الخروج يظهر فقط في صفحة Dashboard
//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("هل أنت متأكد من تسجيل الخروج؟");
//     if (confirmLogout) {
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("customerName");
//       navigate("/login");
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
//       {/* رأس الصفحة */}
//       <header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1rem 2rem",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#2c3e50a8",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* زر الرجوع */}
//         {!hideBackOn.includes(location.pathname) ? <BackButton label="رجوع" /> : <div style={{ width: "75px" }}></div>}

//         {/* اللوجو مع صندوق خلفه */}
//         <div style={{ backgroundColor: "#fdfdfd59", padding: "5px", borderRadius: "5px" }}>
//           <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
//         </div>

//         {/* زر تسجيل الخروج فقط في Dashboard */}
//         {isDashboard && (
//           <button
//             className="Btn"
//             onClick={handleLogout}
//             title="تسجيل خروج"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               width: "45px",
//               height: "45px",
//               border: "none",
//               borderRadius: "50%",
//               cursor: "pointer",
//               overflow: "hidden",
//               transitionDuration: ".3s",
//               boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.199)",
//               backgroundColor: "rgb(255, 65, 65)",
//               zIndex: 10,
//             }}
//           >
//             <div
//               className="sign"
//               style={{
//                 width: "100%",
//                 marginLeft: "2px",
//                 transitionDuration: ".3s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
//                 <path
//                   d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                   fill="white"
//                 ></path>
//               </svg>
//             </div>
//             <div
//               className="text"
//               style={{
//                 position: "absolute",
//                 right: "15%",
//                 width: "0%",
//                 opacity: 0,
//                 color: "white",
//                 fontSize: "1.2em",
//                 fontWeight: 600,
//                 transitionDuration: ".3s",
//               }}
//             >
//               Logout
//             </div>
//           </button>
//         )}
//       </header>

//       {/* المحتوى */}
//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }



// // src/components/Layout.js
// import React from "react";
// import logo from "../pages/images/logo.png"; // تأكد أن المسار صحيح
// import { useLocation, useNavigate } from "react-router-dom";
// import BackButton from "./BackButton";
// import { useTranslation } from "react-i18next";

// export default function Layout({ children }) {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];
//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = () => {
//     const confirmLogout = window.confirm(t("layout.logoutTitle") + "?");
//     if (confirmLogout) {
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("customerName");
//       navigate("/login");
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
//       {/* رأس الصفحة */}
//       <header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1rem 2rem",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#2c3e50a8",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* زر الرجوع */}
//         {!hideBackOn.includes(location.pathname) ? (
//           <BackButton label={t("layout.back")} />
//         ) : (
//           <div style={{ width: "75px" }}></div>
//         )}

//         {/* اللوجو */}
//         <div style={{ backgroundColor: "#fdfdfd59", padding: "5px", borderRadius: "5px" }}>
//           <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
//         </div>

//         {/* زر تسجيل الخروج */}
//         {isDashboard && (
//           <button
//             className="Btn"
//             onClick={handleLogout}
//             title={t("layout.logoutTitle")}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               width: "45px",
//               height: "45px",
//               border: "none",
//               borderRadius: "50%",
//               cursor: "pointer",
//               overflow: "hidden",
//               transitionDuration: ".3s",
//               boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.199)",
//               backgroundColor: "rgb(255, 65, 65)",
//               zIndex: 10,
//             }}
//           >
//             <div
//               className="sign"
//               style={{
//                 width: "100%",
//                 marginLeft: "2px",
//                 transitionDuration: ".3s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
//                 <path
//                   d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                   fill="white"
//                 ></path>
//               </svg>
//             </div>
//             <div
//               className="text"
//               style={{
//                 position: "absolute",
//                 right: "15%",
//                 width: "0%",
//                 opacity: 0,
//                 color: "white",
//                 fontSize: "1.2em",
//                 fontWeight: 600,
//                 transitionDuration: ".3s",
//               }}
//             >
//               {t("layout.logoutText")}
//             </div>
//           </button>
//         )}
//       </header>

//       {/* المحتوى */}
//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }


// // src/components/Layout.js
// import React, { useState } from "react";
// import logo from "../pages/images/logo.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import BackButton from "./BackButton";
// import { useTranslation } from "react-i18next";

// export default function Layout({ children }) {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showLangMenu, setShowLangMenu] = useState(false);

//   const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];
//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = () => {
//     const confirmLogout = window.confirm(t("layout.logoutTitle") + "?");
//     if (confirmLogout) {
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("customerName");
//       navigate("/login");
//     }
//   };

//   const toggleLanguageMenu = () => setShowLangMenu(!showLangMenu);

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//     setShowLangMenu(false);
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
//       <header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1rem 2rem",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#2c3e50a8",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* زر الرجوع */}
//         {!hideBackOn.includes(location.pathname) ? (
//           <BackButton label={t("Back")} />
//         ) : (
//           <div style={{ width: "75px" }}></div>
//         )}

//         {/* اللوجو + زر اللغة */}
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" ,}}>
//           {/* زر اللغة على شكل كرة أرضية */}
//           <div style={{ position: "relative" }}>
//             <button
//               onClick={toggleLanguageMenu}
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "#19568",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
//               }}
//               title={t("layout.changeLanguage")}
//             >
//               🌐
//             </button>

//             {/* قائمة اختيار اللغة */}
//             {showLangMenu && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "50px",
//                   left: 0,
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                   overflow: "hidden",
//                   zIndex: 1000,
//                 }}
//               >
//                 <button
//                   onClick={() => changeLanguage("ar")}
//                   style={{
//                     padding: "0.5rem 1rem",
//                     width: "100%",
//                     border: "none",
//                     background: "none",
//                     textAlign: "left",
//                     cursor: "pointer",
//                   }}
//                 >
//                   عربي
//                 </button>
//                 <button
//                   onClick={() => changeLanguage("en")}
//                   style={{
//                     padding: "0.5rem 1rem",
//                     width: "100%",
//                     border: "none",
//                     background: "none",
//                     textAlign: "left",
//                     cursor: "pointer",
//                   }}
//                 >
//                   English
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* اللوجو */}
//           <div style={{ backgroundColor: "#fdfdfd59", padding: "5px", borderRadius: "5px" }}>
//             <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
//           </div>
//         </div>

//         {/* زر تسجيل الخروج */}
//         {isDashboard && (
//           <button
//             className="Btn"
//             onClick={handleLogout}
//             title={t("layout.logoutTitle")}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               width: "45px",
//               height: "45px",
//               border: "none",
//               borderRadius: "50%",
//               cursor: "pointer",
//               overflow: "hidden",
//               transitionDuration: ".3s",
//               boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.199)",
//               backgroundColor: "rgb(255, 65, 65)",
//               zIndex: 10,
//             }}
//           >
//             <div
//               className="sign"
//               style={{
//                 width: "100%",
//                 marginLeft: "2px",
//                 transitionDuration: ".3s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
//                 <path
//                   d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                   fill="white"
//                 ></path>
//               </svg>
//             </div>
//             <div
//               className="text"
//               style={{
//                 position: "absolute",
//                 right: "15%",
//                 width: "0%",
//                 opacity: 0,
//                 color: "white",
//                 fontSize: "1.2em",
//                 fontWeight: 600,
//                 transitionDuration: ".3s",
//               }}
//             >
//               {t("layout.logoutText")}
//             </div>
//           </button>
//         )}
//       </header>

//       {/* المحتوى */}
//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }


// // src/components/Layout.js
// import React, { useState } from "react";
// import logo from "../pages/images/logo.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import BackButton from "./BackButton";
// import { useTranslation } from "react-i18next";

// export default function Layout({ children }) {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showLangMenu, setShowLangMenu] = useState(false);

//   const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];
//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = () => {
//     const confirmLogout = window.confirm(t("layout.logoutTitle") + "?");
//     if (confirmLogout) {
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("customerName");
//       navigate("/login");
//     }
//   };

//   const toggleLanguageMenu = () => setShowLangMenu(!showLangMenu);

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//     setShowLangMenu(false);
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
//       <header
//         style={{
//           position: "relative", // مهم لتحديد موقع الكرة الأرضية
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1rem 2rem",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#2c3e50a8",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* زر الرجوع */}
//         {!hideBackOn.includes(location.pathname) ? (
//           <BackButton label={t("Back")} />
//         ) : (
//           <div style={{ width: "75px" }}></div>
//         )}

//         {/* زر اللغة على شكل كرة أرضية */}
//         <button
//           onClick={toggleLanguageMenu}
//           style={{
//             position: "absolute",
//             top: "50%",          // منتصف الهيدر عمودي
//             left: "130px",        // المسافة من اليسار، عدل الرقم لتحرك الكرة
//             transform: "translateY(-50%)",
//             width: "50px",
//             height: "50px",
//             borderRadius: "50%",
//             border: "none",
//             cursor: "pointer",
//             backgroundColor: "#002b8696",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
//             zIndex: 100,
//               fontSize: "24px", // ← هذا هو اللي يغير حجم الكرة الأرضية
//           }}
//           title={t("layout.changeLanguage")}
//         >
//           🌐
//         </button>

//         {/* قائمة اختيار اللغة */}
//         {showLangMenu && (
//           <div
//             style={{
//               position: "absolute",
//               top: "60px",
//               left: "10px", // نفس مسافة الكرة
//               backgroundColor: "#fff",
//               borderRadius: "5px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//               overflow: "hidden",
//               zIndex: 1000,
//             }}
//           >
//             <button
//               onClick={() => changeLanguage("ar")}
//               style={{
//                 padding: "0.5rem 1rem",
//                 width: "100%",
//                 border: "none",
//                 background: "none",
//                 textAlign: "left",
//                 cursor: "pointer",
//               }}
//             >
//               عربي
//             </button>
//             <button
//               onClick={() => changeLanguage("en")}
//               style={{
//                 padding: "0.5rem 1rem",
//                 width: "100%",
//                 border: "none",
//                 background: "none",
//                 textAlign: "left",
//                 cursor: "pointer",
//               }}
//             >
//               English
//             </button>
//           </div>
//         )}

//         {/* اللوجو */}
//         <div style={{ backgroundColor: "#fdfdfd59", padding: "5px", borderRadius: "5px" }}>
//           <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
//         </div>

//         {/* زر تسجيل الخروج */}
//         {isDashboard && (
//           <button
//             className="Btn"
//             onClick={handleLogout}
//             title={t("layout.logoutTitle")}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//               width: "45px",
//               height: "45px",
//               border: "none",
//               borderRadius: "50%",
//               cursor: "pointer",
//               overflow: "hidden",
//               transitionDuration: ".3s",
//               boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.199)",
//               backgroundColor: "rgb(255, 65, 65)",
//               zIndex: 10,
//             }}
//           >
//             <div
//               className="sign"
//               style={{
//                 width: "100%",
//                 marginLeft: "2px",
//                 transitionDuration: ".3s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
//                 <path
//                   d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                   fill="white"
//                 ></path>
//               </svg>
//             </div>
//           </button>
//         )}
//       </header>

//       {/* المحتوى */}
//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }


// // src/components/Layout.js
// import React, { useState } from "react";
// import logo from "../pages/images/logo.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import BackButton from "./BackButton";
// import { useTranslation } from "react-i18next";

// export default function Layout({ children }) {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showLangMenu, setShowLangMenu] = useState(false);
//   const [hoverLogout, setHoverLogout] = useState(false);

//   const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];
//   const isDashboard = location.pathname === "/dashboard";

//   const handleLogout = () => {
//     const confirmLogout = window.confirm(t("layout.logoutTitle") + "?");
//     if (confirmLogout) {
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("customerName");
//       navigate("/login");
//     }
//   };

//   const toggleLanguageMenu = () => setShowLangMenu(!showLangMenu);

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//     setShowLangMenu(false);
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
//       <header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "1rem 2rem",
//           borderBottom: "1px solid #ddd",
//           backgroundColor: "#2c3e50a8",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//         }}
//       >
//         {/* الجزء الأيسر: زر الخروج + زر اللغة */}
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           {/* زر الخروج */}
//           {isDashboard && (
//             <button
//               onClick={handleLogout}
//               onMouseEnter={() => setHoverLogout(true)}
//               onMouseLeave={() => setHoverLogout(false)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-start",
//                 width: hoverLogout ? "125px" : "45px",
//                 height: "45px",
//                 border: "none",
//                 borderRadius: hoverLogout ? "40px" : "50%",
//                 cursor: "pointer",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition: "0.3s",
//                 boxShadow: "2px 2px 10px rgba(0,0,0,0.199)",
//                 backgroundColor: hoverLogout ? "black" : "white",
//               }}
//             >
//               <div
//                 style={{
//                   width: hoverLogout ? "30%" : "100%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "0.3s",
//                   paddingLeft: hoverLogout ? "20px" : "0",
//                 }}
//               >
//                 <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
//                   <path
//                     d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
//                     fill={hoverLogout ? "white" : "black"}
//                   />
//                 </svg>
//               </div>
//               <div
//                 style={{
//                   position: "absolute",
//                   right: "-12%",
//                   width: hoverLogout ? "70%" : "0%",
//                   opacity: hoverLogout ? 1 : 0,
//                   color: "white",
//                   fontSize: "1.2em",
//                   fontWeight: 600,
//                   transition: "0.3s",
//                   paddingRight: hoverLogout ? "10px" : "0",
//                 }}
//               >
//                 {t("logout")}
//               </div>
//             </button>
//           )}

//           {/* زر اللغة */}
//           <div style={{ position: "relative" }}>
//             <button
//               onClick={toggleLanguageMenu}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "50%",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "#002b8696",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
//                 fontSize: "24px",
//               }}
//               title={t("layout.changeLanguage")}
//             >
//               🌐
//             </button>

//             {showLangMenu && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "60px",
//                   left: 0,
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//                   overflow: "hidden",
//                   zIndex: 1000,
//                 }}
//               >
//                 <button
//                   onClick={() => changeLanguage("ar")}
//                   style={{
//                     padding: "0.5rem 1rem",
//                     width: "100%",
//                     border: "none",
//                     background: "none",
//                     textAlign: "left",
//                     cursor: "pointer",
//                   }}
//                 >
//                   عربي
//                 </button>
//                 <button
//                   onClick={() => changeLanguage("en")}
//                   style={{
//                     padding: "0.5rem 1rem",
//                     width: "100%",
//                     border: "none",
//                     background: "none",
//                     textAlign: "left",
//                     cursor: "pointer",
//                   }}
//                 >
//                   English
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* اللوجو على اليمين */}
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           {/* زر الرجوع */}
//           {!hideBackOn.includes(location.pathname) ? (
//             <BackButton label={t("Back")} />
//           ) : (
//             <div style={{ width: "75px" }}></div>
//           )}

//           <div style={{ backgroundColor: "#fdfdfd", padding: "5px", borderRadius: "5px" }}>
//             <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
//           </div>
//         </div>
//       </header>

//       <main style={{ padding: "2px" }}>{children}</main>
//     </div>
//   );
// }


// src/components/Layout.js
import React, { useState } from "react";
import logo from "../pages/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);

  const hideBackOn = ["/login", "/dashboard", "/admin", "/admin/manage"];
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    const confirmLogout = window.confirm(t("layout.logoutTitle") + "?");
    if (confirmLogout) {
      localStorage.removeItem("customerId");
      localStorage.removeItem("customerName");
      navigate("/login");
    }
  };

  const toggleLanguageMenu = () => setShowLangMenu(!showLangMenu);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#2c3e50a8",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* اليسار: زر الرجوع → زر الخروج → زر اللغة */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" ,  }}>
          {/* زر الرجوع */}
          {!hideBackOn.includes(location.pathname) && <BackButton label={t("Back")} />}

          {/* زر الخروج */}
          {isDashboard && (
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                width: hoverLogout ? "125px" : "45px",
                height: "45px",
                border: "none",
                borderRadius: hoverLogout ? "40px" : "50%",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "0.3s",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.199)",
                backgroundColor: hoverLogout ? "black" : "white",
              }}
            >
              <div
                style={{
                  width: hoverLogout ? "30%" : "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.3s",
                  paddingLeft: hoverLogout ? "20px" : "0",
                }}
              >
                <svg viewBox="0 0 512 512" style={{ width: "17px" }}>
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                    fill={hoverLogout ? "white" : "black"}
                  />
                </svg>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "-12%",
                  width: hoverLogout ? "70%" : "0%",
                  opacity: hoverLogout ? 1 : 0,
                  color: "white",
                  fontSize: "1.2em",
                  fontWeight: 600,
                  transition: "0.3s",
                  paddingRight: hoverLogout ? "10px" : "0",
                }}
              >
                {t("logout")}
              </div>
            </button>
          )}

          {/* زر اللغة */}
          <div style={{ position: "relative" }}>
            <button
              onClick={toggleLanguageMenu}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#ffffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.3)",
                fontSize: "24px",
              }}
              title={t("layout.changeLanguage")}
            >
              🌐
            </button>

            {showLangMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  overflow: "hidden",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={() => changeLanguage("ar")}
                  style={{
                    padding: "0.5rem 1rem",
                    width: "100%",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  عربي
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  style={{
                    padding: "0.5rem 1rem",
                    width: "100%",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* اليمين: شعار الشركة */}
        <div style={{ backgroundColor: "#fdfdfd", padding: "5px", borderRadius: "5px" }}>
          <img src={logo} alt="شعار الشركة" style={{ height: "50px" }} />
        </div>
      </header>

      <main style={{ padding: "2px" }}>{children}</main>
    </div>
  );
}

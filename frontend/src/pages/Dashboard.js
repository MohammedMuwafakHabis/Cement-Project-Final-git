

// // Dashboard.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const customerId = localStorage.getItem("customerId");
//     if (!customerId) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   // const handleLogout = () => {
//   //  const confirmLogout = window.confirm("هل أنت متأكد من تسجيل الخروج؟");
//   // if (confirmLogout) {
//   //   localStorage.removeItem("customerId");
//   //   localStorage.removeItem("customerName");
//   //   navigate("/login");
//   // }
//   // };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "2rem",
//         fontFamily:
//           "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         direction: "rtl",
//         position: "relative",
//       }}
//     >
//       {/* زر تسجيل الخروج الجديد */}
//       <style>{`
//         .Btn {
//           display: flex;
//           align-items: center;
//           justify-content: flex-start;
//           width: 45px;
//           height: 45px;
//           border: none;
//           border-radius: 50%;
//           cursor: pointer;
//           position: absolute;
//           top: 20px;
//           left: 20px;
//           overflow: hidden;
//           transition-duration: .3s;
//           box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
//           background-color: rgb(255, 65, 65);
//           z-index: 10;
//         }

//         .sign {
//           width: 100%;
//           margin-left: 2px;
//           transition-duration: .3s;
//           display: flex;
//           align-items: center;
//           justify-content: center;
          
//         }

//         .sign svg {
//           width: 17px;
//         }

//         .sign svg path {
//           fill: white;
//         }

//         .text {
//           position: absolute;
//           right: 15%;
//           width: 0%;
//           opacity: 0;
//           color: white;
//           font-size: 1.2em;
//           font-weight: 600;
//           transition-duration: .3s;

//         }

//         .Btn:hover {
//           width: 125px;
//           border-radius: 40px;
//           transition-duration: .3s;
//         }

//         .Btn:hover .sign {
//           width: 30%;
//           transition-duration: .3s;
//           padding-left: 20px;
//         }

//         .Btn:hover .text {
//           opacity: 1;
//           width: 70%;
//           transition-duration: .3s;
//           padding-right: 10px;
//         }

//         .Btn:active {
//           transform: translate(2px ,2px);
//         }
//       `}</style>

//       {/* <button className="Btn" onClick={handleLogout} title="تسجيل خروج">
//         <div className="sign">
//           <svg viewBox="0 0 512 512">
//             <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
//           </svg>
//         </div>
//         <div className="text">Logout</div>
//       </button> */}

//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundColor: "rgba(255, 255, 255, 0.1)",
//           zIndex: 0,
//         }}
//       />

//       <div
//         style={{
//           backgroundColor: "#ffffff93",
//           padding: "3rem 2.5rem",
//           borderRadius: "15px",
//           boxShadow: "0 8px 30px rgba(0, 0, 0, 0.69)",
//           textAlign: "center",
//           width: "100%",
//           maxWidth: "420px",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <h2
//           style={{
//             marginBottom: "2.5rem",
//             color: "#2c3e50",
//             fontWeight: "700",
//             fontSize: "1.8rem",
//           }}
//         >
//           لوحة التحكم
//         </h2>

//         <button
//           onClick={() => navigate("/new-order")}
//           style={{
//             width: "100%",
//             padding: "1.1rem",
//             marginBottom: "1.3rem",
//             backgroundColor: "#2c3e50",
//             color: "#fff",
//             border: "none",
//             borderRadius: "10px",
//             fontSize: "1.1rem",
//             fontWeight: "600",
//             cursor: "pointer",
//             boxShadow: "0 4px 12px rgba(0, 86, 179, 0.4)",
//             transition: "all 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#003e80")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50" )}
//         >
//           ➕ عمل طلبية جديدة
//         </button>

//         <button
//           onClick={() => navigate("/orders")}
//           style={{
//             width: "100%",
//             padding: "1.1rem",
//             color: "#fff",
//             border: "none",
//             backgroundColor: "#2c3e50",
//             borderRadius: "10px",
//             fontSize: "1.1rem",
//             fontWeight: "600",
//             cursor: "pointer",
//             boxShadow: "0 4px 12px rgba(0, 86, 179, 0.4)",
//             transition: "all 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#003e80")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50" )}
//         >
//           📋 سجل الطلبات
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



// Dashboard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./images/Yamama-Cement-to.jpg";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        direction: t("direction"),
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          backgroundColor: "#ffffff93",
          padding: "3rem 2.5rem",
          borderRadius: "15px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.69)",
          textAlign: "center",
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            marginBottom: "2.5rem",
            color: "#2c3e50",
            fontWeight: "700",
            fontSize: "1.8rem",
          }}
        >
          {t("dashboard.title")}
        </h2>

        <button
          onClick={() => navigate("/new-order")}
          style={{
            width: "100%",
            padding: "1.1rem",
            marginBottom: "1.3rem",
            backgroundColor: "#2c3e50",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 86, 179, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#003e80")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        >
          {t("dashboard.newOrderButton")}
        </button>

        <button
          onClick={() => navigate("/orders")}
          style={{
            width: "100%",
            padding: "1.1rem",
            color: "#fff",
            border: "none",
            backgroundColor: "#2c3e50",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 86, 179, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#003e80")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        >
          {t("dashboard.orderHistoryButton")}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

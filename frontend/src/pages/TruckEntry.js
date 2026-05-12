// // // src/pages/TruckEntry.js
// // import React, { useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import jsQR from "jsqr";

// // const TruckEntry = () => {
// //   const [orderData, setOrderData] = useState(null);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const canvasRef = useRef(null);
// //   const navigate = useNavigate();

// //   const fetchOrder = async (orderId) => {
// //     setError("");
// //     setOrderData(null);
// //     setLoading(true);
// //     try {
// //       const res = await fetch(
// //         `http://localhost:4000/gate/lookup?by=order&value=${orderId}`
// //       );
// //       const data = await res.json();
// //       if (res.ok) {
// //         setOrderData(data);
// //       } else {
// //         setError(data.error || "تعذر جلب البيانات");
// //       }
// //     } catch (err) {
// //       setError("خطأ في الاتصال بالسيرفر");
// //     }
// //     setLoading(false);
// //   };

// //   const handleImageUpload = (e) => {
// //     setError("");
// //     setOrderData(null);
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const img = new Image();
// //       img.onload = () => {
// //         const canvas = canvasRef.current;
// //         const ctx = canvas.getContext("2d");
// //         canvas.width = img.width;
// //         canvas.height = img.height;
// //         ctx.drawImage(img, 0, 0);

// //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// //         const code = jsQR(imageData.data, imageData.width, imageData.height);

// //         if (code) {
// //           try {
// //             const parsed = JSON.parse(code.data);
// //             if (parsed.order_id) {
// //               fetchOrder(parsed.order_id);
// //             } else {
// //               setError("QR لا يحتوي على رقم الطلب");
// //             }
// //           } catch (err) {
// //             fetchOrder(code.data);
// //           }
// //         } else {
// //           setError("لم يتم العثور على QR Code في الصورة");
// //         }
// //       };
// //       img.src = reader.result;
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         padding: "2rem",
// //       }}
// //     >
// //       <h2>بوابة دخول الشاحنات</h2>

// //       <input type="file" accept="image/*" onChange={handleImageUpload} />

// //       {loading && <p>جاري جلب البيانات...</p>}

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {orderData && (
// //         <div
// //           style={{
// //             marginTop: "1rem",
// //             border: "1px solid #ccc",
// //             padding: "1rem",
// //             width: "320px",
// //           }}
// //         >
// //           <h3>تفاصيل الطلب</h3>
// //           <p>
// //             <strong>رقم الطلب:</strong> {orderData.order_number}
// //           </p>
// //           <p>
// //             <strong>الشاحنة:</strong> {orderData.truck_name}
// //           </p>
// //           <p>
// //             <strong>رقم اللوحة:</strong> {orderData.plate}
// //           </p>
// //           <p>
// //             <strong>السائق:</strong> {orderData.driver_name}
// //           </p>
// //           <p>
// //             <strong>نوع الاسمنت:</strong> {orderData.cement_type}
// //           </p>
// //           <p>
// //             <strong>الكمية (أطنان):</strong> {orderData.quantity_tons}
// //           </p>
// //           <p>
// //             <strong>المبلغ المدفوع:</strong> {orderData.amount_paid}
// //           </p>
// //           <p>
// //             <strong>الحالة:</strong> {orderData.status}
// //           </p>

// //           {orderData.status === "جديد" ? (
// //             <>
// //               <p style={{ color: "green", fontWeight: "bold" }}>
// //                 ✅ مسموح بالدخول
// //               </p>
// //               <button
// //                 style={{ marginTop: "1rem" }}
// //                 onClick={() =>
// //                   navigate("/truck-load", {
// //                     state: { orderData },
// //                   })
// //                 }
// //               >
// //                 التالي
// //               </button>
// //             </>
// //           ) : (
// //             <p style={{ color: "red", fontWeight: "bold" }}>
// //               🚫 غير مسموح بالدخول
// //             </p>
// //           )}
// //         </div>
// //       )}

// //       <canvas ref={canvasRef} style={{ display: "none" }} />
// //     </div>
// //   );
// // };

// // export default TruckEntry;


// // src/pages/TruckEntry.js
// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import jsQR from "jsqr";

// const TruckEntry = () => {
//   const [orderData, setOrderData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   const fetchOrder = async (orderId) => {
//     setError("");
//     setOrderData(null);
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:4000/gate/lookup?by=order&value=${orderId}`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setOrderData(data);
//       } else {
//         setError(data.error || "تعذر جلب البيانات");
//       }
//     } catch (err) {
//       setError("خطأ في الاتصال بالسيرفر");
//     }
//     setLoading(false);
//   };

//   const handleImageUpload = (e) => {
//     setError("");
//     setOrderData(null);
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height);

//         if (code) {
//           try {
//             const parsed = JSON.parse(code.data);
//             if (parsed.order_id) {
//               fetchOrder(parsed.order_id);
//             } else {
//               setError("QR لا يحتوي على رقم الطلب");
//             }
//           } catch (err) {
//             fetchOrder(code.data);
//           }
//         } else {
//           setError("لم يتم العثور على QR Code في الصورة");
//         }
//       };
//       img.src = reader.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "2rem",
//       }}
//     >
//       <h2>بوابة دخول الشاحنات</h2>

//       <input type="file" accept="image/*" onChange={handleImageUpload} />

//       {loading && <p>جاري جلب البيانات...</p>}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {orderData && (
//         <div
//           style={{
//             marginTop: "1rem",
//             border: "1px solid #ccc",
//             padding: "1rem",
//             width: "320px",
//           }}
//         >
//           <h3>تفاصيل الطلب</h3>
//           <p>
//             <strong>رقم الطلب:</strong> {orderData.order_number}
//           </p>
//           <p>
//             <strong>الشاحنة:</strong> {orderData.truck_name}
//           </p>
//           <p>
//             <strong>رقم اللوحة:</strong> {orderData.plate}
//           </p>
//           <p>
//             <strong>السائق:</strong> {orderData.driver_name}
//           </p>
//           <p>
//             <strong>نوع الاسمنت:</strong> {orderData.cement_type}
//           </p>
//           <p>
//             <strong>الكمية (أطنان):</strong> {orderData.quantity_tons}
//           </p>
//           <p>
//             <strong>المبلغ المدفوع:</strong> {orderData.amount_paid}
//           </p>
//           <p>
//             <strong>الحالة:</strong> {orderData.status}
//           </p>

//           {orderData.status === "جديد" ? (
//             <>
//               <p style={{ color: "green", fontWeight: "bold" }}>
//                 ✅ مسموح بالدخول
//               </p>
//               <button
//                 style={{ marginTop: "1rem" }}
//                 onClick={() =>
//                   navigate("/truck-load", {
//                     state: { orderData },
//                   })
//                 }
//               >
//                 التالي
//               </button>
//             </>
//           ) : (
//             <p style={{ color: "red", fontWeight: "bold" }}>
//               🚫 غير مسموح بالدخول
//             </p>
//           )}
//         </div>
//       )}

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default TruckEntry;






// src/pages/TruckEntry.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";

const TruckEntry = () => {
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const fetchOrder = async (orderId) => {
    setError("");
    setOrderData(null);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/gate/lookup?by=order&value=${orderId}`
      );
      const data = await res.json();
      if (res.ok) {
        setOrderData(data);
      } else {
        setError(data.error || "تعذر جلب البيانات");
      }
    } catch {
      setError("خطأ في الاتصال بالسيرفر");
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    setError("");
    setOrderData(null);
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          try {
            const parsed = JSON.parse(code.data);
            if (parsed.order_id) {
              fetchOrder(parsed.order_id);
            } else {
              setError("QR لا يحتوي على رقم الطلب");
            }
          } catch {
            fetchOrder(code.data);
          }
        } else {
          setError("لم يتم العثور على QR Code في الصورة");
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

const markAsInProgress = async () => {
  if (!orderData) {
    setError("لا توجد بيانات طلب");
    return;
  }

  setError("");

  try {
    const res = await fetch("http://localhost:4000/truckloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: orderData.customer_id,
        truck_id: null, // لأنك ما تستخدم جدول شاحنات
        product_id: null, // تقدر تعبيه لاحقًا إذا عندك جدول نوع الاسمنت
        weight_empty: 0,
        weight_full: 0,
        status: "in_progress", // ✅ الحالة بالإنجليزي
        order_id: orderData.order_number,
        truck_name: orderData.truck_name,
        plate_number: orderData.plate_number,
        driver_name: orderData.driver_name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "فشل في تحديث حالة الطلب");
      return;
    }

    // ✅ توجيه بعد النجاح
    navigate("/truck-load", { state: { orderData } });
  } catch (err) {
    console.error("❌ خطأ أثناء تسجيل الدخول:", err);
    setError("فشل في الاتصال بالخادم");
  }
};


  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center", backgroundColor: "#f6fff7ab", marginTop: 160 ,paddingTop: 20, paddingBottom: 20,}}>
      <h2 style={{ marginTop:20 }}>بوابة دخول الشاحنات</h2> 
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>جاري جلب البيانات...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderData && (
        <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem",  }}>
          <h3>تفاصيل الطلب</h3>
          <p><b>رقم الطلب:</b> {orderData.order_number}</p>
          <p><b>الشاحنة:</b> {orderData.truck_name}</p>
          <p><b>رقم اللوحة:</b> {orderData.plate_number}</p>
          <p><b>السائق:</b> {orderData.driver_name}</p>
          <p><b>نوع الاسمنت:</b> {orderData.cement_type}</p>
          <p><b>الكمية (أطنان):</b> {orderData.quantity}</p>
          <p><b>المبلغ المدفوع:</b> {orderData.total_cost}</p>
          <p><b>الحالة:</b> {orderData.status}</p>

          {orderData.status === "new" ? (

            <>
              <p style={{ color: "green", fontWeight: "bold" }}>✅ مسموح بالدخول</p>
              <button onClick={markAsInProgress}>تسجيل دخول</button>
            </>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>🚫 غير مسموح بالدخول</p>
          )}
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default TruckEntry;

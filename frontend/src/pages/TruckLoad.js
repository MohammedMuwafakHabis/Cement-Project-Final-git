// // import React, { useState, useRef } from "react";
// // import jsQR from "jsqr";
// // import Barcode from "react-barcode";

// // const TruckLoad = () => {
// //   const [truckData, setTruckData] = useState(null);
// //   const [weightEmpty, setWeightEmpty] = useState("");
// //   const [weightFull, setWeightFull] = useState(null);
// //   const [netWeight, setNetWeight] = useState(null);
// //   const [error, setError] = useState("");
// //   const [barcodeData, setBarcodeData] = useState("");
// //   const canvasRef = useRef(null);

// //   // اقرأ QR كود من صورة
// //   const handleImageUpload = (e) => {
// //     setError("");
// //     setTruckData(null);
// //     setWeightEmpty("");
// //     setWeightFull(null);
// //     setNetWeight(null);
// //     setBarcodeData("");

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
// //             setTruckData(parsed);
// //           } catch {
// //             setError("QR لا يحتوي على بيانات صالحة");
// //           }
// //         } else {
// //           setError("لم يتم العثور على QR Code في الصورة");
// //         }
// //       };
// //       img.src = reader.result;
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   // حساب الوزن الكامل والصافي
// //   const calculateWeights = () => {
// //     if (!weightEmpty || !truckData?.cement_weight) {
// //       setError("يرجى إدخال وزن الشاحنة الفارغة والتأكد من وجود وزن الاسمنت في البيانات");
// //       return;
// //     }
// //     const full = parseFloat(weightEmpty) + parseFloat(truckData.cement_weight);
// //     setWeightFull(full);
// //     setNetWeight(truckData.cement_weight);
// //     setError("");
// //   };

// //   // تحميل البيانات للباك اند
// //   const uploadLoad = async () => {
// //     if (!truckData) {
// //       setError("لا توجد بيانات للشاحنة");
// //       return;
// //     }
// //     if (!weightEmpty || !weightFull || !netWeight) {
// //       setError("يرجى حساب الأوزان قبل التحميل");
// //       return;
// //     }

// //     const payload = {
// //       ...truckData,
// //       weight_empty: parseFloat(weightEmpty),
// //       weight_full: weightFull,
// //       net_weight: netWeight,
// //       status: "تم التحميل"
// //     };

// //     try {
// //       const res = await fetch("http://localhost:4000/truckloads", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         setBarcodeData(JSON.stringify(payload));
// //         alert("✅ تم تحميل البيانات بنجاح");
// //       } else {
// //         setError(data.error || "فشل في تحميل البيانات");
// //       }
// //     } catch (err) {
// //       setError("خطأ في الاتصال بالسيرفر");
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
// //       <h2>ميزان الشاحنة وتحميل الاسمنت</h2>

// //       <input type="file" accept="image/*" onChange={handleImageUpload} />

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {truckData && (
// //         <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
// //           <h3>بيانات الشاحنة</h3>
// //           <p><b>رقم الشاحنة:</b> {truckData.truck_number}</p>
// //           <p><b>رقم اللوحة:</b> {truckData.plate_number}</p>
// //           <p><b>نوع الاسمنت (بالطن):</b> {truckData.cement_weight}</p>

// //           <label>
// //             وزن الشاحنة الفارغة (كجم):
// //             <input
// //               type="number"
// //               value={weightEmpty}
// //               onChange={(e) => setWeightEmpty(e.target.value)}
// //               placeholder="أدخل الوزن هنا"
// //               style={{ marginLeft: "0.5rem" }}
// //             />
// //           </label>

// //           <button onClick={calculateWeights} style={{ marginTop: "1rem" }}>
// //             حساب الوزن الكامل والصافي
// //           </button>

// //           {weightFull && netWeight && (
// //             <>
// //               <p><b>وزن الشاحنة بعد التحميل:</b> {weightFull} كجم</p>
// //               <p><b>الوزن الصافي (وزن الاسمنت):</b> {netWeight} كجم</p>

// //               <button onClick={uploadLoad} style={{ marginTop: "1rem" }}>
// //                 تحميل البيانات وتوليد باركود جديد
// //               </button>
// //             </>
// //           )}

// //           {barcodeData && (
// //             <div style={{ marginTop: "1rem" }}>
// //               <h4>الباركود الجديد</h4>
// //               <Barcode value={barcodeData} />
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       <canvas ref={canvasRef} style={{ display: "none" }} />
// //     </div>
// //   );
// // };

// // export default TruckLoad;

// // --------------------------------------------------------------================================================-=========================

// // src/pages/TruckLoad.js
// import React, { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import jsQR from "jsqr";
// import Barcode from "react-barcode";

// const TruckLoad = () => {
//   const location = useLocation();
//   const orderData = location.state?.orderData || null;

//   const [weightEmpty, setWeightEmpty] = useState("");
//   const [weightFull, setWeightFull] = useState(null);
//   const [netWeight, setNetWeight] = useState(null);
//   const [error, setError] = useState("");
//   const [barcodeData, setBarcodeData] = useState("");
//   const [confirmed, setConfirmed] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const canvasRef = useRef(null);

//   // حساب الوزن الكامل والصافي تلقائيًا عند إدخال وزن الشاحنة الفارغة
//   useEffect(() => {
//     if (weightEmpty && orderData?.quantity_tons) {
//       const full =
//         parseFloat(weightEmpty) + parseFloat(orderData.quantity_tons);
//       setWeightFull(full);
//       setNetWeight(parseFloat(orderData.quantity_tons));
//     }
//   }, [weightEmpty, orderData]);

//   // رفع صورة QR لتأكيد الخروج وتحديث الحالة
//   const handleExitQRUpload = (e) => {
//     setError("");
//     setConfirmed(false);
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

//             // تحقق أن QR المرفوع يمثل نفس الطلب وحالته تغيرت لـ "تم التحميل"
//             if (
//               parsed.order_number === orderData.order_number &&
//               parsed.status === "تم التحميل"
//             ) {
//               setConfirmed(true);
//               setBarcodeData(JSON.stringify(parsed));
//               setError("");
//             } else {
//               setError(
//                 "الباركود لا يتطابق مع الطلب أو لم يتم تحديث الحالة إلى 'تم التحميل'"
//               );
//             }
//           } catch {
//             setError("QR لا يحتوي على بيانات صالحة");
//           }
//         } else {
//           setError("لم يتم العثور على QR Code في الصورة");
//         }
//       };
//       img.src = reader.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   // إرسال البيانات للباك اند مع تحديث الحالة إلى "تم التحميل"
//   const handleConfirmExit = async () => {
//     if (!weightEmpty) {
//       setError("يرجى إدخال وزن الشاحنة الفارغة");
//       return;
//     }
//     if (!orderData) {
//       setError("لا توجد بيانات شاحنة");
//       return;
//     }

//     setUploading(true);
//     setError("");

//     const updatedData = {
//       ...orderData,
//       weight_empty: parseFloat(weightEmpty),
//       weight_full: weightFull,
//       net_weight: netWeight,
//       status: "تم التحميل",
//     };

//     try {
//       const res = await fetch("http://localhost:4000/truckloads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setBarcodeData(JSON.stringify(updatedData));
//         alert("✅ تم تأكيد تحميل الشاحنة وتحديث الحالة");
//       } else {
//         setError(data.error || "فشل في تحميل البيانات");
//       }
//     } catch {
//       setError("خطأ في الاتصال بالسيرفر");
//     }

//     setUploading(false);
//   };

//   if (!orderData) {
//     return (
//       <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//         <h2>لا توجد بيانات شاحنة</h2>
//         <p>يرجى العودة إلى صفحة بوابة دخول الشاحنات وتحميل البيانات أولاً.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//       <h2>ميزان الشاحنة وتحميل الاسمنت</h2>

//       <div
//         style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}
//       >
//         <h3>بيانات الشاحنة</h3>
//         <p>
//           <b>رقم الشاحنة:</b> {orderData.truck_name || orderData.truck_number}
//         </p>
//         <p>
//           <b>رقم اللوحة:</b> {orderData.plate}
//         </p>
//         <p>
//           <b>نوع الاسمنت (طن):</b> {orderData.quantity_tons}
//         </p>

//         <label>
//           وزن الشاحنة الفارغة (طن):
//           <input
//             type="number"
//             step="0.01"
//             value={weightEmpty}
//             onChange={(e) => setWeightEmpty(e.target.value)}
//             placeholder="أدخل الوزن هنا"
//             style={{ marginLeft: "0.5rem" }}
//             disabled={confirmed}
//           />
//         </label>

//         {weightFull && netWeight && (
//           <>
//             <p>
//               <b>وزن الشاحنة بعد التحميل:</b> {weightFull.toFixed(2)} كجم
//             </p>
//             <p>
//               <b>الوزن الصافي (وزن الاسمنت):</b> {netWeight.toFixed(2)} كجم
//             </p>
//           </>
//         )}

//         {!confirmed && (
//           <button
//             onClick={handleConfirmExit}
//             style={{ marginTop: "1rem" }}
//             disabled={uploading}
//           >
//             {uploading ? "جاري التحميل..." : "تسجيل الخروج وتأكيد التحميل"}
//           </button>
//         )}

//         {confirmed && (
//           <>
//             <p
//               style={{ color: "green", fontWeight: "bold", marginTop: "1rem" }}
//             >
//               ✅ تم تأكيد الخروج وتحديث حالة الطلب
//             </p>
//             <div style={{ marginTop: "1rem" }}>
//               <h4>الباركود الجديد</h4>
//               <Barcode value={barcodeData} />
//             </div>
//           </>
//         )}

//         <div style={{ marginTop: "1.5rem" }}>
//           <label>
//             رفع صورة QR لتأكيد الخروج:
//             <input type="file" accept="image/*" onChange={handleExitQRUpload} />
//           </label>
//         </div>

//         {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
//       </div>

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };




// export default TruckLoad;


// import React, { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import jsQR from "jsqr";

// const TruckLoad = () => {
//   const location = useLocation();
//   const initialOrderData = location.state?.orderData || null;

//   const [weightEmpty, setWeightEmpty] = useState("");
//   const [weightFull, setWeightFull] = useState(null);
//   const [error, setError] = useState("");
//   const [qrScanned, setQrScanned] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(initialOrderData); // محدثة من السيرفر

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     console.log("🟢 الحالة الحالية للطلب:", currentOrder?.status);
//     // تحديث الوزن الكامل تلقائيًا بناءً على الوزن الفارغ والكمية
//     if (weightEmpty && currentOrder?.quantity) {
//       setWeightFull(parseFloat(weightEmpty) + parseFloat(currentOrder.quantity));
//     }
//   }, [weightEmpty, currentOrder]);

//   const handleExitQRUpload = (e) => {
//     setError("");
//     setQrScanned(false);
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


//         // console.log( code.data.order_id);

//         if (code) {
//           try {
//             const parsed = JSON.parse(code.data);
//             console.log("✅ QR Parsed:", parsed.order_id);

//             const scannedOrderId = Number(parsed.order_id);
//             const currentOrderId = Number(currentOrder?.order_number || currentOrder?.order_id);

//             console.log("رقم الطلب من QR:", scannedOrderId);
//             console.log("رقم الطلب الحالي:", currentOrderId);

//             if (scannedOrderId === currentOrderId) {
//               // جلب البيانات الأحدث من السيرفر بناءً على رقم الطلب

//                console.log(scannedOrderId);

//               fetch(`http://localhost:4000/gate/lookup?by=order&value=${scannedOrderId}`)
              
//                 .then((res) => res.json())
//                 .then((fresh) => {
//                   if (fresh?.status?.toLowerCase() === "in_progress") {
//                     setCurrentOrder(fresh); // تحديث البيانات بالكامل
//                     setQrScanned(true);
//                     setError("");
//                   } else {
//                     setError("⚠ الحالة في السيرفر ليست 'in_progress'");
//                   }
//                 })
//                 .catch((err) => {
//                   console.error("❌ فشل في جلب بيانات الطلب:", err);
//                   setError("❌ فشل في الاتصال بالسيرفر");
//                 });
//             } else {
//               setError("❌ الباركود لا يتطابق مع رقم الطلب الحالي");
//             }
//           } catch (err) {
//             console.error("❌ خطأ في تحليل QR:", err);
//             setError("QR لا يحتوي على بيانات صالحة");
//           }
//         } else {
//           setError("لم يتم العثور على QR Code في الصورة");
//         }
//       };
//       img.src = reader.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleConfirmExit = async () => {
//     if (!qrScanned) {
//       setError("يرجى أولًا مسح QR خروج الشاحنة");
//       return;
//     }
//     if (!weightEmpty) {
//       setError("يرجى إدخال وزن الشاحنة الفارغة");
//       return;
//     }
//     if (!currentOrder) {
//       setError("لا توجد بيانات شاحنة");
//       return;
//     }

//     setUploading(true);
//     setError("");

//     const updatedData = {
//       customer_id: currentOrder.customer_id,
//       weight_empty: parseFloat(weightEmpty),
//       weight_full: weightFull,
//       status: "done",
//       order_id: currentOrder.order_number || currentOrder.order_id,
//       truck_name: currentOrder.truck_name,
//       plate_number: currentOrder.plate_number,
//       driver_name: currentOrder.driver_name,
//     };

//     try {
//       const res = await fetch("http://localhost:4000/truckloads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ تم تسجيل خروج الشاحنة وتحديث الحالة إلى 'done'");
//       } else {
//         setError(data.error || "فشل في تحديث البيانات");
//       }
//     } catch {
//       setError("حدث خطأ أثناء الاتصال بالخادم");
//     }

//     setUploading(false);
//   };

//   if (!currentOrder) {
//     return (
//       <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//         <h2>لا توجد بيانات شاحنة</h2>
//         <p>يرجى العودة إلى صفحة البوابة وتحميل الطلب أولًا.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
//       <h2 style={{ color: 'white' }}>مرحلة خروج الشاحنة / التأكيد النهائي</h2>

//       <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem", backgroundColor: "#f6fff7ab" }}>
//         <h3>بيانات الطلب والشاحنة</h3>
//         <p><b>رقم الطلب:</b> {currentOrder.order_number || currentOrder.order_id}</p>
//         <p><b>الحالة الحالية:</b> {currentOrder.status}</p>
//         <p><b>الشاحنة:</b> {currentOrder.truck_name}</p>
//         <p><b>رقم اللوحة:</b> {currentOrder.plate_number}</p>
//         <p><b>السائق:</b> {currentOrder.driver_name}</p>
//         <p><b>الكمية (طن):</b> {currentOrder.quantity}</p>

//         <div style={{ margin: "1em 0" }}>
//           <label>
//             وزن الشاحنة الفارغة (طن):
//             <input
//               type="number"
//               step="0.01"
//               value={weightEmpty}
//               onChange={(e) => setWeightEmpty(e.target.value)}
//               placeholder="أدخل الوزن الفارغ"
//               style={{ marginLeft: "0.5rem", width: "120px" }}
//             />
//           </label>
//         </div>

//         <div>
//           <p>قم بمسح QR خروج الشاحنة:</p>
//           <input type="file" accept="image/*" onChange={handleExitQRUpload} />
//         </div>

//         {qrScanned && (
//           <div style={{ marginTop: "1rem" }}>
//             <button disabled={uploading} onClick={handleConfirmExit}>
//               {uploading ? "جاري التسجيل..." : "تسجيل خروج الشاحنة"}
//             </button>
//           </div>
//         )}

//         {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
//       </div>

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default TruckLoad;





// // src/pages/TruckLoad.js
// import React, { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import jsQR from "jsqr";

// const TruckLoad = () => {
//   const location = useLocation();
//   const initialOrderData = location.state?.orderData || null;

//   const [weightEmpty, setWeightEmpty] = useState("");
//   const [weightFull, setWeightFull] = useState(null);
//   const [error, setError] = useState("");
//   const [qrScanned, setQrScanned] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState(initialOrderData);

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     console.log("🟢 الحالة الحالية للطلب:", currentOrder?.status);
//     if (weightEmpty && currentOrder?.quantity) {
//       setWeightFull(parseFloat(weightEmpty) + parseFloat(currentOrder.quantity));
//     }
//   }, [weightEmpty, currentOrder]);

//   const handleExitQRUpload = (e) => {
//     setError("");
//     setQrScanned(false);
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
//             console.log("✅ QR Parsed:", parsed.order_id);

//             const scannedOrderId = Number(parsed.order_id);
//             const currentOrderId = Number(currentOrder?.order_number || currentOrder?.order_id);

//             console.log("رقم الطلب من QR:", scannedOrderId);
//             console.log("رقم الطلب الحالي:", currentOrderId);

//             if (scannedOrderId === currentOrderId) {
//               fetch(`http://localhost:4000/gate/lookup?by=order&value=${scannedOrderId}`)
//                 .then((res) => res.json())
//                 .then((fresh) => {
//                   if (fresh?.status?.toLowerCase() === "in_progress") {
//                     setCurrentOrder(fresh);
//                     setQrScanned(true);
//                     setError("");
//                   } else {
//                     setError("⚠ الحالة في السيرفر ليست 'in_progress'");
//                   }
//                 })
//                 .catch((err) => {
//                   console.error("❌ فشل في جلب بيانات الطلب:", err);
//                   setError("❌ فشل في الاتصال بالسيرفر");
//                 });
//             } else {
//               setError("❌ الباركود لا يتطابق مع رقم الطلب الحالي");
//             }
//           } catch (err) {
//             console.error("❌ خطأ في تحليل QR:", err);
//             setError("QR لا يحتوي على بيانات صالحة");
//           }
//         } else {
//           setError("لم يتم العثور على QR Code في الصورة");
//         }
//       };
//       img.src = reader.result;
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleConfirmExit = async () => {
//     if (!qrScanned) {
//       setError("يرجى أولًا مسح QR خروج الشاحنة");
//       return;
//     }
//     if (!weightEmpty) {
//       setError("يرجى إدخال وزن الشاحنة الفارغة");
//       return;
//     }
//     if (!currentOrder) {
//       setError("لا توجد بيانات شاحنة");
//       return;
//     }

//     // ✅ التحقق من الحمولة قبل الخروج
//    // ✅ التحقق من الحمولة قبل الخروج
// const actualLoad = parseFloat(weightFull) - parseFloat(weightEmpty);
// const requiredLoad = parseFloat(currentOrder.quantity);

// // ✅ الحمولة يجب أن تكون كاملة 100٪
// if (actualLoad < requiredLoad) {
//   setError(
//     `🚫 الحمولة ناقصة (${actualLoad.toFixed(2)} طن من ${requiredLoad.toFixed(
//       2
//     )}). يجب إكمال التحميل قبل تسجيل الخروج.`
//   );
//   return;
// }

// // ✅ وأيضًا في حال كان الوزن أكثر من المطلوب (زيادة غير منطقية)
// if (actualLoad > requiredLoad) {
//   setError(
//     `⚠️ الوزن بعد التحميل (${actualLoad.toFixed(
//       2
//     )}) أكبر من الكمية المطلوبة (${requiredLoad.toFixed(
//       2
//     )}). يرجى التحقق من الميزان.`
//   );
//   return;
// }

//     setUploading(true);
//     setError("");

//     const updatedData = {
//       customer_id: currentOrder.customer_id,
//       weight_empty: parseFloat(weightEmpty),
//       weight_full: parseFloat(weightFull),
//       status: "done",
//       order_id: currentOrder.order_number || currentOrder.order_id,
//       truck_name: currentOrder.truck_name,
//       plate_number: currentOrder.plate_number,
//       driver_name: currentOrder.driver_name,
//     };

//     try {
//       const res = await fetch("http://localhost:4000/truckloads", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ تم تسجيل خروج الشاحنة وتحديث الحالة إلى 'done'");
//       } else {
//         setError(data.error || "فشل في تحديث البيانات");
//       }
//     } catch {
//       setError("حدث خطأ أثناء الاتصال بالخادم");
//     }

//     setUploading(false);
//   };

//   if (!currentOrder) {
//     return (
//       <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//         <h2>لا توجد بيانات شاحنة</h2>
//         <p>يرجى العودة إلى صفحة البوابة وتحميل الطلب أولًا.</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
//       <h2 style={{ color: "white" }}>مرحلة خروج الشاحنة / التأكيد النهائي</h2>

//       <div
//         style={{
//           marginTop: "1rem",
//           border: "1px solid #ccc",
//           padding: "1rem",
//           backgroundColor: "#f6fff7ab",
//         }}
//       >
//         <h3>بيانات الطلب والشاحنة</h3>
//         <p>
//           <b>رقم الطلب:</b> {currentOrder.order_number || currentOrder.order_id}
//         </p>
//         <p>
//           <b>الحالة الحالية:</b> {currentOrder.status}
//         </p>
//         <p>
//           <b>الشاحنة:</b> {currentOrder.truck_name}
//         </p>
//         <p>
//           <b>رقم اللوحة:</b> {currentOrder.plate_number}
//         </p>
//         <p>
//           <b>السائق:</b> {currentOrder.driver_name}
//         </p>
//         <p>
//           <b>الكمية (طن):</b> {currentOrder.quantity}
//         </p>

//         <div style={{ margin: "1em 0" }}>
//           <label>
//             وزن الشاحنة الفارغة (طن):
//             <input
//               type="number"
//               step="0.01"
//               value={weightEmpty}
//               onChange={(e) => setWeightEmpty(e.target.value)}
//               placeholder="أدخل الوزن الفارغ"
//               style={{ marginLeft: "0.5rem", width: "120px" }}
//             />
//           </label>
//         </div>

//         <div style={{ margin: "1em 0" }}>
//           <label>
//             الوزن بعد التحميل (طن):
//             <input
//               type="number"
//               step="0.01"
//               value={weightFull || ""}
//               onChange={(e) => setWeightFull(e.target.value)}
//               placeholder="أدخل الوزن بعد التحميل"
//               style={{ marginLeft: "0.5rem", width: "120px" }}
//             />
//           </label>
//         </div>

//         <div>
//           <p>قم بمسح QR خروج الشاحنة:</p>
//           <input type="file" accept="image/*" onChange={handleExitQRUpload} />
//         </div>

//         {qrScanned && (
//           <div style={{ marginTop: "1rem" }}>
//             <button disabled={uploading} onClick={handleConfirmExit}>
//               {uploading ? "جاري التسجيل..." : "تسجيل خروج الشاحنة"}
//             </button>
//           </div>
//         )}

//         {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
//       </div>

//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default TruckLoad;



// src/pages/TruckLoad.js
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsQR from "jsqr";

const TruckLoad = () => {
  const location = useLocation();
  const initialOrderData = location.state?.orderData || null;

  const [weightEmpty, setWeightEmpty] = useState("");
  const [weightFull, setWeightFull] = useState("");
  const [error, setError] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(initialOrderData);
  const [loadStatus, setLoadStatus] = useState(null); // ✅ حالة الحمولة (ناقصة، كاملة، زائدة)
  const [loadDiff, setLoadDiff] = useState(0); // ✅ الفرق بين الوزن والكمية المطلوبة

  const canvasRef = useRef(null);

  useEffect(() => {
    if (weightEmpty && weightFull && currentOrder?.quantity) {
      const actualLoad =
        parseFloat(weightFull || 0) - parseFloat(weightEmpty || 0);
      const requiredLoad = parseFloat(currentOrder.quantity);
      const diff = (actualLoad - requiredLoad).toFixed(2);
      setLoadDiff(diff);

      if (actualLoad < requiredLoad) {
        setLoadStatus("less");
      } else if (actualLoad > requiredLoad) {
        setLoadStatus("more");
      } else {
        setLoadStatus("perfect");
      }
    } else {
      setLoadStatus(null);
      setLoadDiff(0);
    }
  }, [weightEmpty, weightFull, currentOrder]);

  const handleExitQRUpload = (e) => {
    setError("");
    setQrScanned(false);
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
            const scannedOrderId = Number(parsed.order_id);
            const currentOrderId = Number(
              currentOrder?.order_number || currentOrder?.order_id
            );

            if (scannedOrderId === currentOrderId) {
              fetch(
                `http://localhost:4000/gate/lookup?by=order&value=${scannedOrderId}`
              )
                .then((res) => res.json())
                .then((fresh) => {
                  if (fresh?.status?.toLowerCase() === "in_progress") {
                    setCurrentOrder(fresh);
                    setQrScanned(true);
                    setError("");
                  } else {
                    setError("⚠ الحالة في السيرفر ليست 'in_progress'");
                  }
                })
                .catch(() => {
                  setError("❌ فشل في الاتصال بالسيرفر");
                });
            } else {
              setError("❌ الباركود لا يتطابق مع رقم الطلب الحالي");
            }
          } catch {
            setError("QR لا يحتوي على بيانات صالحة");
          }
        } else {
          setError("لم يتم العثور على QR Code في الصورة");
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmExit = async () => {
    if (!qrScanned) {
      setError("يرجى أولًا مسح QR خروج الشاحنة");
      return;
    }
    if (!weightEmpty || !weightFull) {
      setError("يرجى إدخال الوزن الفارغ والممتلئ");
      return;
    }
    if (!currentOrder) {
      setError("لا توجد بيانات شاحنة");
      return;
    }

    const actualLoad = parseFloat(weightFull) - parseFloat(weightEmpty);
    const requiredLoad = parseFloat(currentOrder.quantity);

    // ✅ الحمولة يجب أن تكون كاملة 100%
    if (actualLoad < requiredLoad) {
      setError(
        `🚫 الحمولة ناقصة (${actualLoad.toFixed(2)} طن من ${requiredLoad.toFixed(
          2
        )}). يجب إكمال التحميل قبل تسجيل الخروج.`
      );
      return;
    }
    if (actualLoad > requiredLoad) {
      setError(
        `⚠️ الوزن الزائد (${actualLoad.toFixed(
          2
        )} طن من ${requiredLoad.toFixed(
          2
        )}). يرجى التأكد من الميزان قبل الخروج.`
      );
      return;
    }

    setUploading(true);
    setError("");

    const updatedData = {
      customer_id: currentOrder.customer_id,
      weight_empty: parseFloat(weightEmpty),
      weight_full: parseFloat(weightFull),
      status: "done",
      order_id: currentOrder.order_number || currentOrder.order_id,
      truck_name: currentOrder.truck_name,
      plate_number: currentOrder.plate_number,
      driver_name: currentOrder.driver_name,
    };

    try {
      const res = await fetch("http://localhost:4000/truckloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ تم تسجيل خروج الشاحنة وتحديث الحالة إلى 'done'");
      } else {
        setError(data.error || "فشل في تحديث البيانات");
      }
    } catch {
      setError("حدث خطأ أثناء الاتصال بالخادم");
    }

    setUploading(false);
  };

  if (!currentOrder) {
    return (
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
        <h2>لا توجد بيانات شاحنة</h2>
        <p>يرجى العودة إلى صفحة البوابة وتحميل الطلب أولًا.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ color: "white" }}>مرحلة خروج الشاحنة / التأكيد النهائي</h2>

      <div
        style={{
          marginTop: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
          backgroundColor: "#f6fff7ab",
        }}
      >
        <h3>بيانات الطلب والشاحنة</h3>
        <p>
          <b>رقم الطلب:</b> {currentOrder.order_number || currentOrder.order_id}
        </p>
        <p>
          <b>الشاحنة:</b> {currentOrder.truck_name}
        </p>
        <p>
          <b>رقم اللوحة:</b> {currentOrder.plate_number}
        </p>
        <p>
          <b>السائق:</b> {currentOrder.driver_name}
        </p>
        <p>
          <b>الكمية المطلوبة:</b> {currentOrder.quantity} طن
        </p>

        <div style={{ margin: "1em 0" }}>
          <label>
            الوزن الفارغ (طن):
            <input
              type="number"
              step="0.01"
              value={weightEmpty}
              onChange={(e) => setWeightEmpty(e.target.value)}
              placeholder="أدخل الوزن الفارغ"
              style={{ marginLeft: "0.5rem", width: "120px" }}
            />
          </label>
        </div>

        <div style={{ margin: "1em 0" }}>
          <label>
            الوزن بعد التحميل (طن):
            <input
              type="number"
              step="0.01"
              value={weightFull}
              onChange={(e) => setWeightFull(e.target.value)}
              placeholder="أدخل الوزن بعد التحميل"
              style={{ marginLeft: "0.5rem", width: "120px" }}
            />
          </label>
        </div>

        {/* ✅ عرض الحالة مباشرة */}
        {loadStatus && (
          <div style={{ marginTop: "1em" }}>
            {loadStatus === "less" && (
              <p style={{ color: "#fe0505fe" }}>
                🚫 الحمولة ناقصة بمقدار {Math.abs(loadDiff)} طن
              </p>
            )}
            {loadStatus === "more" && (
              <p style={{ color: "#4401feff" }}>
                ⚠️ الوزن زائد بمقدار {loadDiff} طن
              </p>
            )}
            {loadStatus === "perfect" && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                ✅ الحمولة كاملة
              </p>
            )}
          </div>
        )}

        <div style={{ marginTop: "1em" }}>
          <p>قم بمسح QR خروج الشاحنة:</p>
          <input type="file" accept="image/*" onChange={handleExitQRUpload} />
        </div>

        {qrScanned && (
          <div style={{ marginTop: "1rem" }}>
            <button
              disabled={
                uploading || loadStatus !== "perfect" // 🔒 الزر ما يشتغل إلا لما تكون الحمولة كاملة
              }
              onClick={handleConfirmExit}
            >
              {uploading ? "جاري التسجيل..." : "تسجيل خروج الشاحنة"}
            </button>
          </div>
        )}

        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default TruckLoad;

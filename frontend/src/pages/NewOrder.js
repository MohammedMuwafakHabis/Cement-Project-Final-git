// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API_BASE_URL from '../config';

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: '',
//     plateNumber: '',
//     driverName: '',
//     orderDate: '',
//     cementType: '',
//     quantity: '',
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);

//   // جيب customerId من localStorage
//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!customerId) {
//       alert('يجب تسجيل الدخول أولاً');
//       navigate('/login');
//       return;
//     }

//     // جلب أنواع الاسمنت
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error('فشل في جلب المنتجات');
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         alert('تعذر جلب أنواع الاسمنت من الخادم');
//       }
//     };

//     // جلب رصيد المحفظة
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error('فشل في جلب رصيد المحفظة');
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch (error) {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === 'cementType' || name === 'quantity') {
//       const selectedProduct = products.find(
//         (p) => p.product_name === (name === 'cementType' ? value : formData.cementType)
//       );
//       const qty = name === 'quantity' ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (totalCost > walletBalance) {
//   //     alert(`رصيدك غير كافي. رصيدك الحالي: ${walletBalance} ريال، والتكلفة: ${totalCost} ريال`);
//   //     return;
//   //   }

//   //   const dataWithTotal = {
//   //     ...formData,
//   //     totalCost,
//   //   };

//   //   navigate('/payment', { state: { orderData: dataWithTotal } });
//   // };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (totalCost > walletBalance) {
//     alert(`رصيدك غير كافي. رصيدك الحالي: ${walletBalance} ريال، والتكلفة: ${totalCost} ريال`);
//     return;
//   }

//   const newOrder = {
//     customer_id: customerId,
//     cement_type: formData.cementType,
//     quantity: Number(formData.quantity),
//     order_date: formData.orderDate,
//     delivery_date: formData.orderDate, // إذا نفس التاريخ، ممكن تغييره لاحقًا
//     total_cost: totalCost,
//     status: 'جديد',
//     // يمكنك إرسال truck info كسجلات منفصلة في جدول آخر لاحقًا إذا أردت
//     truck_name: formData.truckName,
//     plate_number: formData.plateNumber,
//     driver_name: formData.driverName,
//   };

//   try {
//     const res = await fetch(`${API_BASE_URL}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newOrder),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message || 'فشل في إنشاء الطلب.');
//     }

//     const savedOrder = await res.json();

//     // أرسل بيانات الطلب + order_id إلى صفحة الدفع
//     navigate('/payment', {
//       state: {
//         orderData: {
//           ...formData,
//           totalCost,
//           orderId: savedOrder.order_id,  // تأكد أن السيرفر يرجع order_id
//         },
//       },
//     });
//   } catch (error) {
//     alert(error.message || 'حدث خطأ أثناء حفظ الطلب.');
//   }
// };

//   return (
//     <div style={{ padding: '20px', maxWidth: 400, margin: 'auto' }}>
//       <h2 style={{ textAlign: 'center' }}>طلبية جديدة</h2>

//       <p>رصيد محفظتك الحالي: <strong>{walletBalance.toLocaleString()} ريال</strong></p>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//         <input name="truckName" placeholder="اسم الشاحنة" onChange={handleChange} required />
//         <input name="plateNumber" placeholder="رقم اللوحة" onChange={handleChange} required />
//         <input name="driverName" placeholder="اسم السائق" onChange={handleChange} required />
//         <input type="date" name="orderDate" onChange={handleChange} required />

//         <select name="cementType" onChange={handleChange} value={formData.cementType} required>
//           <option value="">اختر نوع الاسمنت</option>
//           {products.map(product => (
//             <option key={product.product_id} value={product.product_name}>
//               {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           name="quantity"
//           placeholder="الكمية (بالطن)"
//           onChange={handleChange}
//           required
//           min="1"
//           value={formData.quantity}
//         />

//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <input
//             type="text"
//             name="totalCost"
//             placeholder="التكلفة النهائية"
//             value={totalCost.toLocaleString()}
//             readOnly
//             style={{ backgroundColor: '#f0f0f0', textAlign: 'center', fontWeight: 'bold', flex: 1 }}
//           />
//           <span>ريال سعودي</span>
//         </div>

//         <button
//           type="submit"
//           style={{
//             padding: '10px',
//             backgroundColor: totalCost > walletBalance ? '#ccc' : '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: totalCost > walletBalance ? 'not-allowed' : 'pointer',
//           }}
//           disabled={totalCost > walletBalance || totalCost === 0}
//         >
//           التالي
//         </button>
//       </form>
//     </div>
//   );
// }

// // export default NewOrder;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API_BASE_URL from '../config';

// import bgImage from '../pages/images/Yamama-Cement-to.jpg';

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: '',
//     plateNumber: '',
//     driverName: '',
//     orderDate: '',
//     cementType: '',
//     quantity: '',
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);

//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!customerId) {
//       alert('يجب تسجيل الدخول أولاً');
//       navigate('/login');
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error('فشل في جلب المنتجات');
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         alert('تعذر جلب أنواع الاسمنت من الخادم');
//       }
//     };

//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error('فشل في جلب رصيد المحفظة');
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === 'cementType' || name === 'quantity') {
//       const selectedProduct = products.find(
//         (p) => p.product_name === (name === 'cementType' ? value : formData.cementType)
//       );
//       const qty = name === 'quantity' ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (totalCost > walletBalance) {
//       alert(`رصيدك غير كافي. رصيدك الحالي: ${walletBalance.toLocaleString()} ريال، والتكلفة: ${totalCost.toLocaleString()} ريال`);
//       return;
//     }

//     const newOrder = {
//       customer_id: customerId,
//       cement_type: formData.cementType,
//       quantity: Number(formData.quantity),
//       order_date: formData.orderDate,
//       delivery_date: formData.orderDate,
//       total_cost: totalCost,
//       status: 'جديد',
//       truck_name: formData.truckName,
//       plate_number: formData.plateNumber,
//       driver_name: formData.driverName,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'فشل في إنشاء الطلب.');
//       }

//       const savedOrder = await res.json();

//       navigate('/payment', {
//         state: {
//           orderData: {
//             ...formData,
//             totalCost,
//             orderId: savedOrder.order_id,
//           },
//         },
//       });
//     } catch (error) {
//       alert(error.message || 'حدث خطأ أثناء حفظ الطلب.');
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '40px 20px',
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           width: '100%',
//           backgroundColor: 'rgba(255, 255, 255, 0.62)',
//           borderRadius: 10,
//           padding: 25,
//           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.52)',
//           fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
//           color: '#003366',
//         }}
//       >
//         <h2 style={{ textAlign: 'center', marginBottom: 20 }}>طلبية جديدة</h2>

//         <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
//           رصيد محفظتك الحالي: <span style={{ color: '#28a745' }}>{walletBalance.toLocaleString()} ريال</span>
//         </p>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
//           <input
//             name="truckName"
//             placeholder="اسم الشاحنة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//           />
//           <input
//             name="plateNumber"
//             placeholder="رقم اللوحة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//           />
//           <input
//             name="driverName"
//             placeholder="اسم السائق"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//           />
//           <input
//             type="date"
//             name="orderDate"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//           />

//           <select
//             name="cementType"
//             onChange={handleChange}
//             value={formData.cementType}
//             required
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', backgroundColor: 'white' }}
//           >
//             <option value="">اختر نوع الاسمنت</option>
//             {products.map(product => (
//               <option key={product.product_id} value={product.product_name}>
//                 {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             name="quantity"
//             placeholder="الكمية (بالطن)"
//             onChange={handleChange}
//             required
//             min="1"
//             value={formData.quantity}
//             style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
//           />

//           <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <input
//               type="text"
//               name="totalCost"
//               placeholder="التكلفة النهائية"
//               value={totalCost.toLocaleString()}
//               readOnly
//               style={{
//                 backgroundColor: '#f0f0f0',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 flex: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 border: '1px solid #ccc',
//               }}
//             />
//             <span>ريال سعودي</span>
//           </div>

//           <button
//             type="submit"
//             disabled={totalCost > walletBalance || totalCost === 0}
//             style={{
//               padding: 12,
//               backgroundColor: totalCost > walletBalance || totalCost === 0 ? '#ccc' : '#042a53fa',
//               color: 'white',
//               border: 'none',
//               borderRadius: 5,
//               cursor: totalCost > walletBalance || totalCost === 0 ? 'not-allowed' : 'pointer',
//               fontWeight: 'bold',
//               transition: 'background-color 0.3s ease',
//             }}
//             onMouseEnter={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = '#0763c5ff';
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = '#032e5cff';
//               }
//             }}
//           >
//             التالي
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewOrder;





//----------------------------------------------------------------------------------------------------------------



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";

// import bgImage from "../pages/images/Yamama-Cement-to.jpg";

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: "",
//     plateNumber: "",
//     driverName: "",
//     orderDate: "",
//     cementType: "",
//     quantity: "",
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);

//   const customerId = localStorage.getItem("customerId");

//   useEffect(() => {
//     if (!customerId) {
//       alert("يجب تسجيل الدخول أولاً");
//       navigate("/login");
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error("فشل في جلب المنتجات");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         alert("تعذر جلب أنواع الاسمنت من الخادم");
//       }
//     };

//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error("فشل في جلب رصيد المحفظة");
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "cementType" || name === "quantity") {
//       const selectedProduct = products.find(
//         (p) =>
//           p.product_name ===
//           (name === "cementType" ? value : formData.cementType)
//       );
//       const qty =
//         name === "quantity" ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // تحقق من أن التاريخ المختار ليس قبل بكرة
//     const tomorrow = new Date();
//     tomorrow.setHours(0, 0, 0, 0);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const selectedDate = new Date(formData.orderDate);
//     selectedDate.setHours(0, 0, 0, 0);

//     if (selectedDate < tomorrow) {
//       alert("اختار تاريخ صحيح (يجب أن يكون بعد اليوم).");
//       return;
//     }

//     if (totalCost > walletBalance) {
//       alert(
//         `رصيدك غير كافي. رصيدك الحالي: ${walletBalance.toLocaleString()} ريال، والتكلفة: ${totalCost.toLocaleString()} ريال`
//       );
//       return;
//     }

//     const newOrder = {
//       customer_id: customerId,
//       cement_type: formData.cementType,
//       quantity: Number(formData.quantity),
//       order_date: formData.orderDate,
//       delivery_date: formData.orderDate,
//       total_cost: totalCost,
//       status: "جديد",
//       truck_name: formData.truckName,
//       plate_number: formData.plateNumber,
//       driver_name: formData.driverName,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "فشل في إنشاء الطلب.");
//       }

//       const savedOrder = await res.json();

//       navigate("/payment", {
//         state: {
//           orderData: {
//             ...formData,
//             totalCost,
//             orderId: savedOrder.order_id,
//           },
//         },
//       });
//     } catch (error) {
//       alert(error.message || "حدث خطأ أثناء حفظ الطلب.");
//     }
//   };

//   // تحديد الحد الأدنى للتاريخ (بداية من الغد)
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const minDate = tomorrow.toISOString().split("T")[0];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           width: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.62)",
//           borderRadius: 10,
//           padding: 25,
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.52)",
//           fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//           color: "#003366",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>طلبية جديدة</h2>

//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: 20,
//             color: "#333",
//           }}
//         >
//           رصيد محفظتك الحالي:{" "}
//           <span style={{ color: "#28a745" }}>
//             {walletBalance.toLocaleString()} ريال
//           </span>
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 15 }}
//         >
//           <input
//             name="truckName"
//             placeholder="اسم الشاحنة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="plateNumber"
//             placeholder="رقم اللوحة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="driverName"
//             placeholder="اسم السائق"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             type="date"
//             name="orderDate"
//             onChange={handleChange}
//             required
//             min={minDate}
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <select
//             name="cementType"
//             onChange={handleChange}
//             value={formData.cementType}
//             required
//             style={{
//               padding: 10,
//               borderRadius: 5,
//               border: "1px solid #ccc",
//               backgroundColor: "white",
//             }}
//           >
//             <option value="">اختر نوع الاسمنت</option>
//             {products.map((product) => (
//               <option key={product.product_id} value={product.product_name}>
//                 {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             name="quantity"
//             placeholder="الكمية (بالطن)"
//             onChange={handleChange}
//             required
//             min="1"
//             value={formData.quantity}
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <input
//               type="text"
//               name="totalCost"
//               placeholder="التكلفة النهائية"
//               value={totalCost.toLocaleString()}
//               readOnly
//               style={{
//                 backgroundColor: "#f0f0f0",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 flex: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 border: "1px solid #ccc",
//               }}
//             />
//             <span>ريال سعودي</span>
//           </div>

//           <button
//             type="submit"
//             disabled={totalCost > walletBalance || totalCost === 0}
//             style={{
//               padding: "12px 20px",
//               backgroundColor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "#ccc"
//                   : "#000085ff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontSize: "16px",
//               cursor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "not-allowed"
//                   : "pointer",
//               width: "100%",
//               marginTop: "10px",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#040274ff"; // لون عند الهوفر
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#0400dde3"; // يرجع للون الأصلي
//               }
//             }}
//           >
//             التالي
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewOrder;


//----------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import API_BASE_URL from "../config";
// import bgImage from "../pages/images/Yamama-Cement-to.jpg";

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: "",
//     plateNumber: "",
//     driverName: "",
//     orderDate: null,
//     cementType: "",
//     quantity: "",
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const customerId = localStorage.getItem("customerId");

//   useEffect(() => {
//     if (!customerId) {
//       alert("يجب تسجيل الدخول أولاً");
//       navigate("/login");
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error("فشل في جلب المنتجات");
//         const data = await res.json();
//         setProducts(data);
//       } catch {
//         alert("تعذر جلب أنواع الاسمنت من الخادم");
//       }
//     };

//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error("فشل في جلب رصيد المحفظة");
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "cementType" || name === "quantity") {
//       const selectedProduct = products.find(
//         (p) =>
//           p.product_name ===
//           (name === "cementType" ? value : formData.cementType)
//       );
//       const qty =
//         name === "quantity" ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.orderDate) {
//       alert("اختر تاريخ الطلب أولاً");
//       return;
//     }

//     if (totalCost > walletBalance) {
//       alert(
//         `رصيدك غير كافي. رصيدك الحالي: ${walletBalance.toLocaleString()} ريال، والتكلفة: ${totalCost.toLocaleString()} ريال`
//       );
//       return;
//     }

//     const newOrder = {
//       customer_id: customerId,
//       cement_type: formData.cementType,
//       quantity: Number(formData.quantity),
//       order_date: formData.orderDate,
//       delivery_date: formData.orderDate,
//       total_cost: totalCost,
//       status: "جديد",
//       truck_name: formData.truckName,
//       plate_number: formData.plateNumber,
//       driver_name: formData.driverName,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "فشل في إنشاء الطلب.");
//       }

//       const savedOrder = await res.json();

//       navigate("/payment", {
//         state: {
//           orderData: {
//             ...formData,
//             totalCost,
//             orderId: savedOrder.order_id,
//           },
//         },
//       });
//     } catch (error) {
//       alert(error.message || "حدث خطأ أثناء حفظ الطلب.");
//     }
//   };

//   // الحد الأدنى للتاريخ هو الغد
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   // دالة لتلوين الأيام
//   const getDayClass = (date) => {
//     const day = date.getDay(); // 0=الأحد ... 5=الجمعة 6=السبت
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (day === 5 || day === 6) return "day-weekend"; // الجمعة والسبت باللون الأحمر
//     if (date < today) return "day-disabled"; // الأيام السابقة باللون الرمادي
//     return "";
//   };

//   // دالة لتعطيل الأيام
//   const isDayDisabled = (date) => {
//     const day = date.getDay();
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return date < today || day === 5 || day === 6; // تعطيل الأيام السابقة والجمعة والسبت
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           width: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.62)",
//           borderRadius: 10,
//           padding: 25,
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.52)",
//           fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//           color: "#003366",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>طلبية جديدة</h2>

//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: 20,
//             color: "#333",
            
//           }}
//         >
//           رصيد محفظتك الحالي:{" "}
//           <span style={{ color: "#28a745" }}>
//             {walletBalance.toLocaleString()} ريال
//           </span>
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 15 }}
//         >
//           <input
//             name="truckName"
//             placeholder="اسم الشاحنة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="plateNumber"
//             placeholder="رقم اللوحة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="driverName"
//             placeholder="اسم السائق"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <DatePicker
//             selected={formData.orderDate}
//             onChange={(date) => setFormData({ ...formData, orderDate: date })}
//             minDate={tomorrow}
//             placeholderText="اختر تاريخ الطلب"
//             dayClassName={getDayClass}
//             filterDate={(date) => !isDayDisabled(date)} // يمنع اختيار الجمعة والسبت والأيام السابقة
//             className="date-input"
            
//           />

//           <select
//             name="cementType"
//             onChange={handleChange}
//             value={formData.cementType}
//             required
//             style={{
//               padding: 10,
//               borderRadius: 5,
//               border: "1px solid #ccc",
//               backgroundColor: "white",
//             }}
//           >
//             <option value="">اختر نوع الاسمنت</option>
//             {products.map((product) => (
//               <option key={product.product_id} value={product.product_name}>
//                 {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             name="quantity"
//             placeholder="الكمية (بالطن)"
//             onChange={handleChange}
//             required
//             min="1"
//             value={formData.quantity}
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <input
//               type="text"
//               name="totalCost"
//               placeholder="التكلفة النهائية"
//               value={totalCost.toLocaleString()}
//               readOnly
//               style={{
//                 backgroundColor: "#f0f0f0",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 flex: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 border: "1px solid #ccc",
//               }}
//             />
//             <span>ريال سعودي</span>
//           </div>

//           <button
//             type="submit"
//             disabled={totalCost > walletBalance || totalCost === 0}
//             style={{
//               padding: "12px 20px",
//               backgroundColor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "#ccc"
//                   : "#000085ff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontSize: "16px",
//               cursor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "not-allowed"
//                   : "pointer",
//               width: "100%",
//               marginTop: "10px",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             التالي
//           </button>
//         </form>
//       </div>

//       <style>
//         {`
//           .day-disabled {
//             color: #ccc !important;
//             text-decoration: line-through;
//           }
//           .day-weekend {
//             color: red !important;
//             font-weight: bold;
//           }
//           .date-input {
//             padding: 10px;
//             border-radius: 5px;
//             border: 1px solid #ccc;
//             width: 100%;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default NewOrder;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import bgImage from "../pages/images/Yamama-Cement-to.jpg";

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: "",
//     plateNumber: "",
//     driverName: "",
//     orderDate: null,
//     cementType: "",
//     quantity: "",
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);

//   const customerId = localStorage.getItem("customerId");

//   useEffect(() => {
//     if (!customerId) {
//       alert("يجب تسجيل الدخول أولاً");
//       navigate("/login");
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error("فشل في جلب المنتجات");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         alert("تعذر جلب أنواع الاسمنت من الخادم");
//       }
//     };

//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error("فشل في جلب رصيد المحفظة");
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "cementType" || name === "quantity") {
//       const selectedProduct = products.find(
//         (p) =>
//           p.product_name ===
//           (name === "cementType" ? value : formData.cementType)
//       );
//       const qty =
//         name === "quantity" ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.orderDate) {
//       alert("يرجى اختيار تاريخ الطلب");
//       return;
//     }

//     const selectedDate = new Date(formData.orderDate);
//     selectedDate.setHours(0, 0, 0, 0);

//     const tomorrow = new Date();
//     tomorrow.setHours(0, 0, 0, 0);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // التأكد من أن التاريخ ليس قبل الغد
//     if (selectedDate < tomorrow) {
//       alert("اختار تاريخ صحيح (يجب أن يكون بعد اليوم).");
//       return;
//     }

//     // منع الجمعة والسبت
//     const dayOfWeek = selectedDate.getDay();
//     if (dayOfWeek === 5 || dayOfWeek === 6) {
//       alert("يوم الجمعة والسبت غير متاحين للاختيار");
//       return;
//     }

//     if (totalCost > walletBalance) {
//       alert(
//         `رصيدك غير كافي. رصيدك الحالي: ${walletBalance.toLocaleString()} ريال، والتكلفة: ${totalCost.toLocaleString()} ريال`
//       );
//       return;
//     }

//     const newOrder = {
//       customer_id: customerId,
//       cement_type: formData.cementType,
//       quantity: Number(formData.quantity),
//       order_date: formData.orderDate.toISOString().split("T")[0],
//       delivery_date: formData.orderDate.toISOString().split("T")[0],
//       total_cost: totalCost,
//       status: "جديد",
//       truck_name: formData.truckName,
//       plate_number: formData.plateNumber,
//       driver_name: formData.driverName,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "فشل في إنشاء الطلب.");
//       }

//       const savedOrder = await res.json();

//       navigate("/payment", {
//         state: {
//           orderData: {
//             ...formData,
//             totalCost,
//             orderId: savedOrder.order_id,
//           },
//         },
//       });
//     } catch (error) {
//       alert(error.message || "حدث خطأ أثناء حفظ الطلب.");
//     }
//   };

//   // الغد كحد أدنى
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   // دوال لتلوين الأيام ومنع اختيارها
//   const isDayDisabled = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);

//     const day = d.getDay();
//     // أيام قبل الغد أو الجمعة والسبت
//     return d < tomorrow || day === 5 || day === 6;
//   };

//   const getDayClass = (date) => {
//     const day = date.getDay();
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);

//     if (d < tomorrow) return "day-disabled"; // أيام سابقة
//     if (day === 5 || day === 6) return "day-weekend"; // الجمعة والسبت
//     return ""; // الأيام المتاحة
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           width: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.62)",
//           borderRadius: 10,
//           padding: 25,
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.52)",
//           fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//           color: "#003366",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>طلبية جديدة</h2>

//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: 20,
//             color: "#333",
//           }}
//         >
//           رصيد محفظتك الحالي:{" "}
//           <span style={{ color: "#28a745" }}>
//             {walletBalance.toLocaleString()} ريال
//           </span>
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 15 }}
//         >
//           <input
//             name="truckName"
//             placeholder="اسم الشاحنة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="plateNumber"
//             placeholder="رقم اللوحة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="driverName"
//             placeholder="اسم السائق"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <DatePicker
//             selected={formData.orderDate}
//             onChange={(date) =>
//               setFormData({ ...formData, orderDate: date })
//             }
//             placeholderText="اختر تاريخ الطلب"
//             dayClassName={getDayClass}
//             filterDate={(date) => !isDayDisabled(date)}
//             className="date-input"
//           />

//           <select
//             name="cementType"
//             onChange={handleChange}
//             value={formData.cementType}
//             required
//             style={{
//               padding: 10,
//               borderRadius: 5,
//               border: "1px solid #ccc",
//               backgroundColor: "white",
//             }}
//           >
//             <option value="">اختر نوع الاسمنت</option>
//             {products.map((product) => (
//               <option key={product.product_id} value={product.product_name}>
//                 {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             name="quantity"
//             placeholder="الكمية (بالطن)"
//             onChange={handleChange}
//             required
//             min="1"
//             value={formData.quantity}
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <input
//               type="text"
//               name="totalCost"
//               placeholder="التكلفة النهائية"
//               value={totalCost.toLocaleString()}
//               readOnly
//               style={{
//                 backgroundColor: "#f0f0f0",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 flex: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 border: "1px solid #ccc",
//               }}
//             />
//             <span>ريال سعودي</span>
//           </div>

//           <button
//             type="submit"
//             disabled={totalCost > walletBalance || totalCost === 0}
//             style={{
//               padding: "12px 20px",
//               backgroundColor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "#ccc"
//                   : "#000085ff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontSize: "16px",
//               cursor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "not-allowed"
//                   : "pointer",
//               width: "100%",
//               marginTop: "10px",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#040274ff";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#0400dde3";
//               }
//             }}
//           >
//             التالي
//           </button>
//         </form>

//         <style>
//           {`
//             .date-input {
//               padding: 10px;
//               border-radius: 5px;
//               border: 1px solid #ccc;
//               width: 100%;
//               box-sizing: border-box;
//             }
//             .day-disabled {
//               color: #ccc !important;
//               text-decoration: line-through;
//               cursor: not-allowed;
//             }
//             .day-weekend {
//               color: red !important;
//               font-weight: bold;
//               cursor: not-allowed;
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// }

// export default NewOrder;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API_BASE_URL from "../config";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import bgImage from "../pages/images/Yamama-Cement-to.jpg";

// function NewOrder() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     truckName: "",
//     plateNumber: "",
//     driverName: "",
//     orderDate: null,
//     cementType: "",
//     quantity: "",
//     pricePerTon: 0,
//   });

//   const [products, setProducts] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletBalance, setWalletBalance] = useState(0);

//   const customerId = localStorage.getItem("customerId");

//   useEffect(() => {
//     if (!customerId) {
//       alert("يجب تسجيل الدخول أولاً");
//       navigate("/login");
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/products`);
//         if (!res.ok) throw new Error("فشل في جلب المنتجات");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         alert("تعذر جلب أنواع الاسمنت من الخادم");
//       }
//     };

//     const fetchWalletBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         if (!res.ok) throw new Error("فشل في جلب رصيد المحفظة");
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch {
//         setWalletBalance(0);
//       }
//     };

//     fetchProducts();
//     fetchWalletBalance();
//   }, [customerId, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let updatedFormData = { ...formData, [name]: value };

//     if (name === "cementType" || name === "quantity") {
//       const selectedProduct = products.find(
//         (p) =>
//           p.product_name ===
//           (name === "cementType" ? value : formData.cementType)
//       );
//       const qty =
//         name === "quantity" ? Number(value) : Number(formData.quantity);

//       if (selectedProduct && qty > 0) {
//         updatedFormData.pricePerTon = selectedProduct.price_per_ton;
//         setTotalCost(qty * selectedProduct.price_per_ton);
//       } else {
//         setTotalCost(0);
//       }
//     }

//     setFormData(updatedFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.orderDate) {
//       alert("يرجى اختيار تاريخ الطلب");
//       return;
//     }

//     const selectedDate = new Date(formData.orderDate);
//     selectedDate.setHours(0, 0, 0, 0);

//     const tomorrow = new Date();
//     tomorrow.setHours(0, 0, 0, 0);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // التأكد من أن التاريخ ليس قبل الغد
//     if (selectedDate < tomorrow) {
//       alert("اختار تاريخ صحيح (يجب أن يكون بعد اليوم).");
//       return;
//     }

//     // منع الجمعة والسبت
//     const dayOfWeek = selectedDate.getDay();
//     if (dayOfWeek === 5 || dayOfWeek === 6) {
//       alert("يوم الجمعة والسبت غير متاحين للاختيار");
//       return;
//     }

//     if (totalCost > walletBalance) {
//       alert(
//         `رصيدك غير كافي. رصيدك الحالي: ${walletBalance.toLocaleString()} ريال، والتكلفة: ${totalCost.toLocaleString()} ريال`
//       );
//       return;
//     }

//     const newOrder = {
//       customer_id: customerId,
//       cement_type: formData.cementType,
//       quantity: Number(formData.quantity),
//       order_date: formData.orderDate.toISOString().split("T")[0],
//       delivery_date: formData.orderDate.toISOString().split("T")[0],
//       total_cost: totalCost,
//       status: "جديد",
//       truck_name: formData.truckName,
//       plate_number: formData.plateNumber,
//       driver_name: formData.driverName,
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "فشل في إنشاء الطلب.");
//       }

//       const savedOrder = await res.json();

//       navigate("/payment", {
//         state: {
//           orderData: {
//             ...formData,
//             totalCost,
//             orderId: savedOrder.order_id,
//           },
//         },
//       });
//     } catch (error) {
//       alert(error.message || "حدث خطأ أثناء حفظ الطلب.");
//     }
//   };

//   // ✅ الغد كحد أدنى (منع اختيار اليوم)
//   const tomorrow = new Date();
//   tomorrow.setHours(0, 0, 0, 0);
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   // ✅ منع الأيام قبل الغد والجمعة والسبت
//   const isDayDisabled = (date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     const day = d.getDay();
//     return d < tomorrow || day === 5 || day === 6;
//   };

//   const getDayClass = (date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     const day = d.getDay();

//     if (d < tomorrow) return "day-disabled";
//     if (day === 5 || day === 6) return "day-weekend";
//     return "";
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px 20px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: 400,
//           width: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.62)",
//           borderRadius: 10,
//           padding: 25,
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.52)",
//           fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
//           color: "#003366",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 20 }}>طلبية جديدة</h2>

//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: "bold",
//             marginBottom: 20,
//             color: "#333",
//           }}
//         >
//           رصيد محفظتك الحالي:{" "}
//           <span style={{ color: "#28a745" }}>
//             {walletBalance.toLocaleString()} ريال
//           </span>
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           style={{ display: "flex", flexDirection: "column", gap: 15 }}
//         >
//           <input
//             name="truckName"
//             placeholder="اسم الشاحنة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="plateNumber"
//             placeholder="رقم اللوحة"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />
//           <input
//             name="driverName"
//             placeholder="اسم السائق"
//             onChange={handleChange}
//             required
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           {/* ✅ التقويم يبدأ من الغد فقط */}
//           <DatePicker
//             selected={formData.orderDate}
//             onChange={(date) => setFormData({ ...formData, orderDate: date })}
//             placeholderText="اختر تاريخ الطلب"
//             dayClassName={getDayClass}
//             filterDate={(date) => !isDayDisabled(date)}
//             minDate={tomorrow}
//             className="date-input"
//           />

//           <select
//             name="cementType"
//             onChange={handleChange}
//             value={formData.cementType}
//             required
//             style={{
//               padding: 10,
//               borderRadius: 5,
//               border: "1px solid #ccc",
//               backgroundColor: "white",
//             }}
//           >
//             <option value="">اختر نوع الاسمنت</option>
//             {products.map((product) => (
//               <option key={product.product_id} value={product.product_name}>
//                 {product.product_name} (سعر الطن: {product.price_per_ton} ريال)
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             name="quantity"
//             placeholder="الكمية (بالطن)"
//             onChange={handleChange}
//             required
//             min="1"
//             value={formData.quantity}
//             style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//           />

//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <input
//               type="text"
//               name="totalCost"
//               placeholder="التكلفة النهائية"
//               value={totalCost.toLocaleString()}
//               readOnly
//               style={{
//                 backgroundColor: "#f0f0f0",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 flex: 1,
//                 padding: 10,
//                 borderRadius: 5,
//                 border: "1px solid #ccc",
//               }}
//             />
//             <span>ريال سعودي</span>
//           </div>

//           <button
//             type="submit"
//             disabled={totalCost > walletBalance || totalCost === 0}
//             style={{
//               padding: "12px 20px",
//               backgroundColor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "#ccc"
//                   : "#000085ff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontSize: "16px",
//               cursor:
//                 totalCost > walletBalance || totalCost === 0
//                   ? "not-allowed"
//                   : "pointer",
//               width: "100%",
//               marginTop: "10px",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#040274ff";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!(totalCost > walletBalance || totalCost === 0)) {
//                 e.target.style.backgroundColor = "#0400dde3";
//               }
//             }}
//           >
//             التالي
//           </button>
//         </form>

//         <style>
//           {`
//             .date-input {
//               padding: 10px;
//               border-radius: 5px;
//               border: 1px solid #ccc;
//               width: 100%;
//               box-sizing: border-box;
//             }
//             .day-disabled {
//               color: #ccc !important;
//               text-decoration: line-through;
//               cursor: not-allowed;
//             }
//             .day-weekend {
//               color: red !important;
//               font-weight: bold;
//               cursor: not-allowed;
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// }

// export default NewOrder;



// NewOrder.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import "../i18n"; // ملف إعداد i18n

import bgImage from "../pages/images/Yamama-Cement-to.jpg";

function NewOrder() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    truckName: "",
    plateNumber: "",
    driverName: "",
    orderDate: null,
    cementType: "",
    quantity: "",
    pricePerTon: 0,
  });

  const [products, setProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!customerId) {
      alert(t("login.loginRequired") || "يجب تسجيل الدخول أولاً");
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error(t("newOrder.fetchProductsFailed"));
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        alert(t("newOrder.fetchProductsFailed"));
      }
    };

    const fetchWalletBalance = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
        if (!res.ok) throw new Error(t("newOrder.fetchWalletFailed"));
        const data = await res.json();
        setWalletBalance(data.TotalBalance || 0);
      } catch {
        setWalletBalance(0);
      }
    };

    fetchProducts();
    fetchWalletBalance();
  }, [customerId, navigate, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "cementType" || name === "quantity") {
      const selectedProduct = products.find(
        (p) =>
          p.product_name ===
          (name === "cementType" ? value : formData.cementType)
      );
      const qty =
        name === "quantity" ? Number(value) : Number(formData.quantity);

      if (selectedProduct && qty > 0) {
        updatedFormData.pricePerTon = selectedProduct.price_per_ton;
        setTotalCost(qty * selectedProduct.price_per_ton);
      } else {
        setTotalCost(0);
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.orderDate) {
      alert(t("newOrder.invalidDate"));
      return;
    }

    const selectedDate = new Date(formData.orderDate);
    selectedDate.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (selectedDate < tomorrow) {
      alert(t("newOrder.invalidDate"));
      return;
    }

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      alert(t("newOrder.weekendNotAllowed"));
      return;
    }

    if (totalCost > walletBalance) {
      alert(
        t("newOrder.insufficientBalance", {
          balance: walletBalance.toLocaleString(),
          cost: totalCost.toLocaleString(),
        })
      );
      return;
    }

    const newOrder = {
      customer_id: customerId,
      cement_type: formData.cementType,
      quantity: Number(formData.quantity),
      order_date: formData.orderDate.toISOString().split("T")[0],
      delivery_date: formData.orderDate.toISOString().split("T")[0],
      total_cost: totalCost,
      status: t("newOrder.statusNew") || "جديد",
      truck_name: formData.truckName,
      plate_number: formData.plateNumber,
      driver_name: formData.driverName,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || t("newOrder.orderCreateFailed"));
      }

      const savedOrder = await res.json();

      navigate("/payment", {
        state: {
          orderData: {
            ...formData,
            totalCost,
            orderId: savedOrder.order_id,
          },
        },
      });
    } catch (error) {
      alert(error.message || t("newOrder.orderCreateFailed"));
    }
  };

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isDayDisabled = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    return d < tomorrow || day === 5 || day === 6;
  };

  const getDayClass = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    if (d < tomorrow) return "day-disabled";
    if (day === 5 || day === 6) return "day-weekend";
    return "";
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >

      <div
        style={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.62)",
          borderRadius: 10,
          padding: 25,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.52)",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          color: "#003366",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {t("newOrder.title")}
        </h2>

<p style={{ textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>
  {t("newOrder.walletBalanceLabel")}:{" "}
  <span style={{ color: "#28a745", fontWeight: "bold" }}>
    {walletBalance.toLocaleString()} {t("newOrder.currency")}
  </span>
</p>



        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 15 }}
        >
          <input
            name="truckName"
            placeholder={t("newOrder.truckName")}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <input
            name="plateNumber"
            placeholder={t("newOrder.plateNumber")}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <input
            name="driverName"
            placeholder={t("newOrder.driverName")}
            onChange={handleChange}
            required
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <DatePicker
            selected={formData.orderDate}
            onChange={(date) => setFormData({ ...formData, orderDate: date })}
            placeholderText={t("newOrder.orderDate")}
            dayClassName={getDayClass}
            filterDate={(date) => !isDayDisabled(date)}
            minDate={tomorrow}
            className="date-input"
          />

          <select
            name="cementType"
            onChange={handleChange}
            value={formData.cementType}
            required
            style={{
              padding: 10,
              borderRadius: 5,
              border: "1px solid #ccc",
              backgroundColor: "white",
            }}
          >
            <option value="">{t("newOrder.cementType")}</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_name}>
                {product.product_name} ({t("newOrder.currency")}: {product.price_per_ton})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder={t("newOrder.quantity")}
            onChange={handleChange}
            required
            min="1"
            value={formData.quantity}
            style={{ padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="text"
              name="totalCost"
              placeholder={t("newOrder.totalCost")}
              value={totalCost.toLocaleString()}
              readOnly
              style={{
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                fontWeight: "bold",
                flex: 1,
                padding: 10,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
            <span>{t("newOrder.currency")}</span>
          </div>

          <button
            type="submit"
            disabled={totalCost > walletBalance || totalCost === 0}
            style={{
              padding: "12px 20px",
              backgroundColor:
                totalCost > walletBalance || totalCost === 0
                  ? "#ccc"
                  : "#000085ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor:
                totalCost > walletBalance || totalCost === 0
                  ? "not-allowed"
                  : "pointer",
              width: "100%",
              marginTop: "10px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!(totalCost > walletBalance || totalCost === 0)) {
                e.target.style.backgroundColor = "#040274ff";
              }
            }}
            onMouseLeave={(e) => {
              if (!(totalCost > walletBalance || totalCost === 0)) {
                e.target.style.backgroundColor = "#0400dde3";
              }
            }}
          >
            {t("newOrder.next")}
          </button>
        </form>

        <style>
          {`
            .date-input {
              padding: 10px;
              border-radius: 5px;
              border: 1px solid #ccc;
              width: 100%;
              box-sizing: border-box;
            }
            .day-disabled {
              color: #ccc !important;
              text-decoration: line-through;
              cursor: not-allowed;
            }
            .day-weekend {
              color: red !important;
              font-weight: bold;
              cursor: not-allowed;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default NewOrder;

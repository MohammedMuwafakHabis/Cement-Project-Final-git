// // import React, { useState, useEffect } from "react";
// // import backgroundImage from "./images/Yamama-Cement-to.jpg";

// // export default function AdminManage() {
// //   const [activeSection, setActiveSection] = useState(null);

// //   // ======================= المنتجات =========================
// //   const [products, setProducts] = useState([]);
// //   const [loadingProducts, setLoadingProducts] = useState(false);
// //   const [errorProducts, setErrorProducts] = useState(null);

// //   const [productForm, setProductForm] = useState({
// //     product_id: null,
// //     product_name: "",
// //     price_per_ton: "",
// //   });

// //   const fetchProducts = async () => {
// //     setLoadingProducts(true);
// //     setErrorProducts(null);
// //     try {
// //       const res = await fetch("http://localhost:4000/products");
// //       if (!res.ok) throw new Error("خطأ في جلب المنتجات");
// //       const data = await res.json();
// //       setProducts(data);
// //     } catch (error) {
// //       setErrorProducts(error.message);
// //     } finally {
// //       setLoadingProducts(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeSection === "products") fetchProducts();
// //   }, [activeSection]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setProductForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleEditProduct = (product) => {
// //     setProductForm({
// //       product_id: product.product_id,
// //       product_name: product.product_name,
// //       price_per_ton: product.price_per_ton.toString(),
// //     });
// //   };

// //   const handleCancelEdit = () => {
// //     setProductForm({ product_id: null, product_name: "", price_per_ton: "" });
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
// //     try {
// //       const res = await fetch(`http://localhost:4000/products/${id}`, {
// //         method: "DELETE",
// //       });
// //       if (!res.ok) throw new Error("فشل في حذف المنتج");
// //       alert("تم حذف المنتج بنجاح");
// //       fetchProducts();
// //       if (productForm.product_id === id) handleCancelEdit();
// //     } catch (error) {
// //       alert(error.message);
// //     }
// //   };

// //   const handleSaveProduct = async (e) => {
// //     e.preventDefault();

// //     if (!productForm.product_name.trim() || !productForm.price_per_ton) {
// //       alert("يرجى إدخال اسم المنتج والسعر بشكل صحيح");
// //       return;
// //     }

// //     const price = parseFloat(productForm.price_per_ton);
// //     if (isNaN(price) || price <= 0) {
// //       alert("السعر يجب أن يكون رقماً أكبر من صفر");
// //       return;
// //     }

// //     try {
// //       let res;
// //       if (productForm.product_id) {
// //         res = await fetch(`http://localhost:4000/products/${productForm.product_id}`, {
// //           method: "PUT",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             product_name: productForm.product_name.trim(),
// //             price_per_ton: price,
// //           }),
// //         });
// //       } else {
// //         res = await fetch("http://localhost:4000/products", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             product_name: productForm.product_name.trim(),
// //             price_per_ton: price,
// //           }),
// //         });
// //       }

// //       if (!res.ok) throw new Error("حدث خطأ أثناء الحفظ");

// //       alert(productForm.product_id ? "تم تعديل المنتج" : "تمت الإضافة بنجاح");
// //       fetchProducts();
// //       handleCancelEdit();
// //     } catch (error) {
// //       alert(error.message);
// //     }
// //   };

// //   // ======================= العملاء =========================
// //   const [customers, setCustomers] = useState([]);
// //   const [filteredCustomers, setFilteredCustomers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [loadingCustomers, setLoadingCustomers] = useState(false);

// //   const fetchCustomers = async () => {
// //     setLoadingCustomers(true);
// //     try {
// //       const res = await fetch("http://localhost:4000/customers");
// //       if (!res.ok) throw new Error("فشل في جلب العملاء");
// //       const data = await res.json();
// //       setCustomers(data);
// //       setFilteredCustomers(data);
// //     } catch {
// //       alert("خطأ أثناء تحميل العملاء");
// //     } finally {
// //       setLoadingCustomers(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeSection === "customers") fetchCustomers();
// //   }, [activeSection]);

// //   const handleSearch = (e) => {
// //     const value = e.target.value.toLowerCase();
// //     setSearchTerm(value);
// //     setFilteredCustomers(
// //       customers.filter(
// //         (c) =>
// //           c.name.toLowerCase().includes(value) ||
// //           c.email?.toLowerCase().includes(value)
// //       )
// //     );
// //   };

// //   // ======================= الشاحنات (وهمية) =========================
// //   const trucks = [
// //     { id: 1, name: "شاحنة 1", plate: "ABC123" },
// //     { id: 2, name: "شاحنة 2", plate: "XYZ456" },
// //   ];

// //   // فتح قسم وإغلاق الباقي
// //   const toggleSection = (section) => {
// //     setActiveSection((prev) => (prev === section ? null : section));
// //   };

// //   return (
// //     <div
// //       style={{
// //         backgroundImage: `url(${backgroundImage})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         height: "100vh",
// //         padding: 20,
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //       }}
// //     >
// //       <div
// //         style={{
// //           backgroundColor: "rgba(255,255,255,0.5)",
// //           padding: "2rem",
// //           borderRadius: 12,
// //           width: "85%",
// //           height: "90vh",
// //           maxWidth: 850,
// //           overflowY: "auto",
// //           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
// //         }}
// //       >
// //         <h2 style={{ textAlign: "center", marginBottom: 30 }}>لوحة تحكم الأدمن</h2>

// //         <button style={buttonStyle} onClick={() => (window.location.href = "/admin/add-funds")}>
// //           ➕ إضافة رصيد للعميل
// //         </button>

// //         <button style={buttonStyle} onClick={() => toggleSection("customers")}>
// //           👥 العملاء {activeSection === "customers" ? "▲" : "▼"}
// //         </button>

// //         <button style={buttonStyle} onClick={() => toggleSection("products")}>
// //           🧱 أنواع الأسمنت {activeSection === "products" ? "▲" : "▼"}
// //         </button>

// //         {/* <button style={buttonStyle} onClick={() => toggleSection("trucks")}>
// //           🚚 الشاحنات {activeSection === "trucks" ? "▲" : "▼"}
// //         </button> */}

// //         <button style={buttonStyle} onClick={() => (window.location.href = "/gate")}>
// //           📥 دخول وخروج الشاحنات (البوابة)
// //         </button>

// //         {/* ===== العملاء ===== */}
// //         {activeSection === "customers" && (
// //           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
// //             <h3>العملاء</h3>
// //             <input
// //               type="text"
// //               placeholder="🔍 Search..."
// //               value={searchTerm}
// //               onChange={handleSearch}
// //               style={{ ...inputStyle, width: "80%", marginBottom: 10 }}
// //             />
// //             {loadingCustomers ? (
// //               <p>جاري التحميل...</p>
// //             ) : (
// //               <>
// //                 <p>عدد العملاء: {filteredCustomers.length}</p>
// //                 <div style={{ maxHeight: 250, overflowY: "auto" }}>
// //                   {filteredCustomers.map((c) => (
// //                     <div key={c.customer_id} style={itemStyle}>
// //                       <div>
// //                         <strong>{c.name}</strong> — {c.email}
// //                         <br />📞 {c.phone}
// //                       </div>
// //                       <div>
// //                         <button style={editButtonStyle}>تعديل</button>
// //                         <button style={deleteButtonStyle}>حذف</button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         )}

// //         {/* ===== المنتجات ===== */}
// //         {activeSection === "products" && (
// //           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
// //             <h3>أنواع الأسمنت</h3>
// //             {loadingProducts && <p>جاري التحميل...</p>}
// //             {errorProducts && <p style={{ color: "red" }}>{errorProducts}</p>}

// //             <form onSubmit={handleSaveProduct} style={{ marginBottom: 20 }}>
// //               <input
// //                 type="text"
// //                 name="product_name"
// //                 placeholder="اسم الأسمنت"
// //                 value={productForm.product_name}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //               />
// //               <input
// //                 type="number"
// //                 name="price_per_ton"
// //                 placeholder="السعر"
// //                 value={productForm.price_per_ton}
// //                 onChange={handleInputChange}
// //                 style={inputStyle}
// //               />
// //               <div style={{ marginTop: 10 }}>
// //                 <button type="submit" style={saveButtonStyle}>
// //                   {productForm.product_id ? "تعديل" : "إضافة"}
// //                 </button>
// //                 {productForm.product_id && (
// //                   <button type="button" onClick={handleCancelEdit} style={cancelButtonStyle}>
// //                     إلغاء
// //                   </button>
// //                 )}
// //               </div>
// //             </form>

// //             {products.length > 0 && (
// //               <div style={{ maxHeight: 250, overflowY: "auto" }}>
// //                 {products.map((product) => (
// //                   <div key={product.product_id} style={itemStyle}>
// //                     <div>
// //                       <strong>{product.product_name}</strong> — {product.price_per_ton} ريال
// //                     </div>
// //                     <div>
// //                       <button style={editButtonStyle} onClick={() => handleEditProduct(product)}>
// //                         تعديل
// //                       </button>
// //                       <button
// //                         style={deleteButtonStyle}
// //                         onClick={() => handleDeleteProduct(product.product_id)}
// //                       >
// //                         حذف
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* ===== الشاحنات ===== */}
// //         {activeSection === "trucks" && (
// //           <div style={{ ...sectionStyle, ...fadeIn }}>
// //             <h3>الشاحنات</h3>
// //             {trucks.map((t) => (
// //               <div key={t.id} style={itemStyle}>
// //                 <strong>{t.name}</strong> — اللوحة: {t.plate}
// //                 <button
// //                   style={deleteButtonStyle}
// //                   onClick={() => alert(`🚫 حذف الشاحنة ${t.name} (قيد التطوير)`)}
// //                 >
// //                   حذف
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );

// // }

// // // =============== تنسيقات عامة ===============
// // const buttonStyle = {
// //   padding: "12px 20px",
// //   margin: "8px 0",
// //   width: "100%",
// //   fontSize: "16px",
// //   borderRadius: "6px",
// //   border: "none",
// //   backgroundColor: "#0c007cec",
// //   color: "white",
// //   cursor: "pointer",
// // };

// // const sectionStyle = {
// //   marginTop: 10,
// //   padding: 15,
// //   backgroundColor: "#f0f0f0ff",
// //   borderRadius: 6,
// //   textAlign: "left",
// // };

// // const fadeIn = {
// //   animation: "fadeIn 0.4s ease",
// // };

// // const itemStyle = {
// //   marginBottom: 10,
// //   paddingBottom: 8,
// //   borderBottom: "1px solid #ccc",
// //   display: "flex",
// //   justifyContent: "space-between",
// //   alignItems: "center",
// // };

// // const deleteButtonStyle = {
// //   backgroundColor: "#dc3545",
// //   border: "none",
// //   color: "white",
// //   padding: "4px 8px",
// //   borderRadius: "4px",
// //   cursor: "pointer",
// //   marginRight: 15
// // };

// // const editButtonStyle = {
// //   backgroundColor: "#0d6efd",
// //   border: "none",
// //   color: "white",
// //   padding: "4px 8px",
// //   borderRadius: "4px",
// //   cursor: "pointer",
// //   marginRight: 25 ,
// // };

// // const inputStyle = {
// //   padding: 10,
// //   marginBottom: 10,
// //   width: "calc(50% - 10px)",
// //   marginRight: 10,
// //   borderRadius: 5,
// //   border: "1px solid #ccc",
// // };

// // const saveButtonStyle = {
// //   padding: "10px 20px",
// //   backgroundColor: "#198754",
// //   color: "white",
// //   border: "none",
// //   borderRadius: 6,
// //   cursor: "pointer",
// //   marginRight: 10,
// // };

// // const cancelButtonStyle = {
// //   padding: "10px 20px",
// //   backgroundColor: "#6c757d",
// //   color: "white",
// //   border: "none",
// //   borderRadius: 6,
// //   cursor: "pointer",
// // };

// // // إضافة keyframe داخل مكون React (أنميشن)
// // const styleSheet = document.styleSheets[0];
// // styleSheet.insertRule(
// //   `@keyframes fadeIn {
// //     from { opacity: 0; transform: translateY(-8px); }
// //     to { opacity: 1; transform: translateY(0); }
// //   }`,
// //   styleSheet.cssRules.length
// // );

// import React, { useState, useEffect } from "react";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// export default function AdminManage() {
//   const [activeSection, setActiveSection] = useState(null);

//   // ======================= المنتجات =========================
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [errorProducts, setErrorProducts] = useState(null);

//   const [productForm, setProductForm] = useState({
//     product_id: null,
//     product_name: "",
//     price_per_ton: "",
//   });

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     setErrorProducts(null);
//     try {
//       const res = await fetch("http://localhost:4000/products");
//       if (!res.ok) throw new Error("خطأ في جلب المنتجات");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       setErrorProducts(error.message);
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "products") fetchProducts();
//   }, [activeSection]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditProduct = (product) => {
//     setProductForm({
//       product_id: product.product_id,
//       product_name: product.product_name,
//       price_per_ton: product.price_per_ton.toString(),
//     });
//   };

//   const handleCancelEdit = () => {
//     setProductForm({ product_id: null, product_name: "", price_per_ton: "" });
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
//     try {
//       const res = await fetch(`http://localhost:4000/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("فشل في حذف المنتج");
//       alert("تم حذف المنتج بنجاح");
//       fetchProducts();
//       if (productForm.product_id === id) handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleSaveProduct = async (e) => {
//     e.preventDefault();

//     if (!productForm.product_name.trim() || !productForm.price_per_ton) {
//       alert("يرجى إدخال اسم المنتج والسعر بشكل صحيح");
//       return;
//     }

//     const price = parseFloat(productForm.price_per_ton);
//     if (isNaN(price) || price <= 0) {
//       alert("السعر يجب أن يكون رقماً أكبر من صفر");
//       return;
//     }

//     try {
//       let res;
//       if (productForm.product_id) {
//         res = await fetch(`http://localhost:4000/products/${productForm.product_id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       } else {
//         res = await fetch("http://localhost:4000/products", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       }

//       if (!res.ok) throw new Error("حدث خطأ أثناء الحفظ");

//       alert(productForm.product_id ? "تم تعديل المنتج" : "تمت الإضافة بنجاح");
//       fetchProducts();
//       handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // ======================= العملاء =========================
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loadingCustomers, setLoadingCustomers] = useState(false);

//   const fetchCustomers = async () => {
//     setLoadingCustomers(true);
//     try {
//       const res = await fetch("http://localhost:4000/customers");
//       if (!res.ok) throw new Error("فشل في جلب العملاء");
//       const data = await res.json();
//       setCustomers(data);
//       setFilteredCustomers(data);
//     } catch {
//       alert("خطأ أثناء تحميل العملاء");
//     } finally {
//       setLoadingCustomers(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "customers") fetchCustomers();
//   }, [activeSection]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setFilteredCustomers(
//       customers.filter(
//         (c) =>
//           c.name.toLowerCase().includes(value) ||
//           c.email?.toLowerCase().includes(value)
//       )
//     );
//   };

//   // ======================= الطلبات =========================
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [errorOrders, setErrorOrders] = useState(null);

//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     setErrorOrders(null);
//     try {
//       const res = await fetch("http://localhost:4000/orders");
//       if (!res.ok) throw new Error("فشل في جلب الطلبات");
//       const data = await res.json();
//       setOrders(data);
//     } catch (error) {
//       setErrorOrders(error.message);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "orders") fetchOrders();
//   }, [activeSection]);

//   // ======================= الشاحنات (وهمية) =========================
//   const trucks = [
//     { id: 1, name: "شاحنة 1", plate: "ABC123" },
//     { id: 2, name: "شاحنة 2", plate: "XYZ456" },
//   ];

//   // فتح قسم وإغلاق الباقي
//   const toggleSection = (section) => {
//     setActiveSection((prev) => (prev === section ? null : section));
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         padding: 20,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255,255,255,0.5)",
//           padding: "2rem",
//           borderRadius: 12,
//           width: "85%",
//           height: "90vh",
//           maxWidth: 850,
//           overflowY: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 30 }}>لوحة تحكم الأدمن</h2>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/admin/add-funds")}>
//           ➕ إضافة رصيد للعميل
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("customers")}>
//           👥 العملاء {activeSection === "customers" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("products")}>
//           🧱 أنواع الأسمنت {activeSection === "products" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("orders")}>
//           🛒 الطلبات {activeSection === "orders" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/gate")}>
//           📥 دخول وخروج الشاحنات (البوابة)
//         </button>

//         {/* ===== العملاء ===== */}
//         {activeSection === "customers" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>العملاء</h3>
//             <input
//               type="text"
//               placeholder="🔍 Search..."
//               value={searchTerm}
//               onChange={handleSearch}
//               style={{ ...inputStyle, width: "80%", marginBottom: 10 }}
//             />
//             {loadingCustomers ? (
//               <p>جاري التحميل...</p>
//             ) : (
//               <>
//                 <p>عدد العملاء: {filteredCustomers.length}</p>
//                 <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                   {filteredCustomers.map((c) => (
//                     <div key={c.customer_id} style={itemStyle}>
//                       <div>
//                         <strong>{c.name}</strong> — {c.email}
//                         <br />📞 {c.phone}
//                       </div>
//                       <div>
//                         <button style={editButtonStyle}>تعديل</button>
//                         <button style={deleteButtonStyle}>حذف</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ===== المنتجات ===== */}
//         {activeSection === "products" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>أنواع الأسمنت</h3>
//             {loadingProducts && <p>جاري التحميل...</p>}
//             {errorProducts && <p style={{ color: "red" }}>{errorProducts}</p>}

//             <form onSubmit={handleSaveProduct} style={{ marginBottom: 20 }}>
//               <input
//                 type="text"
//                 name="product_name"
//                 placeholder="اسم الأسمنت"
//                 value={productForm.product_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <input
//                 type="number"
//                 name="price_per_ton"
//                 placeholder="السعر"
//                 value={productForm.price_per_ton}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <button type="submit" style={saveButtonStyle}>
//                   {productForm.product_id ? "تعديل" : "إضافة"}
//                 </button>
//                 {productForm.product_id && (
//                   <button type="button" onClick={handleCancelEdit} style={cancelButtonStyle}>
//                     إلغاء
//                   </button>
//                 )}
//               </div>
//             </form>

//             {products.length > 0 && (
//               <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                 {products.map((product) => (
//                   <div key={product.product_id} style={itemStyle}>
//                     <div>
//                       <strong>{product.product_name}</strong> — {product.price_per_ton} ريال
//                     </div>
//                     <div>
//                       <button style={editButtonStyle} onClick={() => handleEditProduct(product)}>
//                         تعديل
//                       </button>
//                       <button
//                         style={deleteButtonStyle}
//                         onClick={() => handleDeleteProduct(product.product_id)}
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ===== الطلبات ===== */}
//         {activeSection === "orders" && (
//           <div style={{ ...sectionStyle, ...fadeIn }}>
//             <h3>جميع الطلبات</h3>
//             {loadingOrders && <p>جاري التحميل...</p>}
//             {errorOrders && <p style={{ color: "red" }}>{errorOrders}</p>}
//             {!loadingOrders && !errorOrders && (
//               <>
//                 <p>عدد الطلبات: {orders.length}</p>
//                 <div style={{ maxHeight: 300, overflowY: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                       <tr>
//                         <th style={tableHeaderStyle}>العميل</th>
//                         <th style={tableHeaderStyle}>المنتج</th>
//                         <th style={tableHeaderStyle}>الكمية</th>
//                         <th style={tableHeaderStyle}>الحالة</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order.order_id}>
//                           <td style={tableCellStyle}>{order.customer_name}</td>
//                           <td style={tableCellStyle}>{order.product_name}</td>
//                           <td style={tableCellStyle}>{order.quantity}</td>
//                           <td style={tableCellStyle}>{order.status}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ===== الشاحنات ===== */}
//         {activeSection === "trucks" && (
//           <div style={{ ...sectionStyle, ...fadeIn }}>
//             <h3>الشاحنات</h3>
//             {trucks.map((t) => (
//               <div key={t.id} style={itemStyle}>
//                 <strong>{t.name}</strong> — اللوحة: {t.plate}
//                 <button
//                   style={deleteButtonStyle}
//                   onClick={() => alert(`🚫 حذف الشاحنة ${t.name} (قيد التطوير)`)}
//                 >
//                   حذف
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // =============== تنسيقات عامة ===============
// const buttonStyle = {
//   padding: "12px 20px",
//   margin: "8px 0",
//   width: "100%",
//   fontSize: "16px",
//   borderRadius: "6px",
//   border: "none",
//   backgroundColor: "#0c007cec",
//   color: "white",
//   cursor: "pointer",
// };

// const sectionStyle = {
//   marginTop: 10,
//   padding: 15,
//   backgroundColor: "#f0f0f0ff",
//   borderRadius: 6,
//   textAlign: "left",
// };

// const fadeIn = {
//   animation: "fadeIn 0.4s ease",
// };

// const itemStyle = {
//   marginBottom: 10,
//   paddingBottom: 8,
//   borderBottom: "1px solid #ddd",
//   display: "flex",
//   justifyContent: "space-between",
// };

// const editButtonStyle = { backgroundColor: "#2196F3", color: "white", border: "none", padding: "5px 10px", borderRadius: 4, cursor: "pointer", marginRight: 5 };
// const deleteButtonStyle = { backgroundColor: "#f44336", color: "white", border: "none", padding: "5px 10px", borderRadius: 4, cursor: "pointer" };
// const saveButtonStyle = { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "8px 16px", borderRadius: 4, cursor: "pointer", marginRight: 5 };
// const cancelButtonStyle = { backgroundColor: "#f44336", color: "white", border: "none", padding: "8px 16px", borderRadius: 4, cursor: "pointer" };
// const inputStyle = { padding: "6px 10px", margin: "4px 0", width: "45%", borderRadius: 4, border: "1px solid #ccc" };

// // ===== جدول الطلبات =====
// const tableHeaderStyle = {
//   borderBottom: "2px solid #ccc",
//   textAlign: "left",
//   padding: "8px",
// };

// const tableCellStyle = {
//   borderBottom: "1px solid #eee",
//   padding: "8px",
// };

// import React, { useState, useEffect } from "react";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// export default function AdminManage() {
//   const [activeSection, setActiveSection] = useState(null);

//   // ======================= المنتجات =========================
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [errorProducts, setErrorProducts] = useState(null);

//   const [productForm, setProductForm] = useState({
//     product_id: null,
//     product_name: "",
//     price_per_ton: "",
//   });

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     setErrorProducts(null);
//     try {
//       const res = await fetch("http://localhost:4000/products");
//       if (!res.ok) throw new Error("خطأ في جلب المنتجات");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       setErrorProducts(error.message);
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "products") fetchProducts();
//   }, [activeSection]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditProduct = (product) => {
//     setProductForm({
//       product_id: product.product_id,
//       product_name: product.product_name,
//       price_per_ton: product.price_per_ton.toString(),
//     });
//   };

//   const handleCancelEdit = () => {
//     setProductForm({ product_id: null, product_name: "", price_per_ton: "" });
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
//     try {
//       const res = await fetch(`http://localhost:4000/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("فشل في حذف المنتج");
//       alert("تم حذف المنتج بنجاح");
//       fetchProducts();
//       if (productForm.product_id === id) handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleSaveProduct = async (e) => {
//     e.preventDefault();

//     if (!productForm.product_name.trim() || !productForm.price_per_ton) {
//       alert("يرجى إدخال اسم المنتج والسعر بشكل صحيح");
//       return;
//     }

//     const price = parseFloat(productForm.price_per_ton);
//     if (isNaN(price) || price <= 0) {
//       alert("السعر يجب أن يكون رقماً أكبر من صفر");
//       return;
//     }

//     try {
//       let res;
//       if (productForm.product_id) {
//         res = await fetch(`http://localhost:4000/products/${productForm.product_id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       } else {
//         res = await fetch("http://localhost:4000/products", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       }

//       if (!res.ok) throw new Error("حدث خطأ أثناء الحفظ");

//       alert(productForm.product_id ? "تم تعديل المنتج" : "تمت الإضافة بنجاح");
//       fetchProducts();
//       handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // ======================= العملاء =========================
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loadingCustomers, setLoadingCustomers] = useState(false);

//   const fetchCustomers = async () => {
//     setLoadingCustomers(true);
//     try {
//       const res = await fetch("http://localhost:4000/customers");
//       if (!res.ok) throw new Error("فشل في جلب العملاء");
//       const data = await res.json();
//       setCustomers(data);
//       setFilteredCustomers(data);
//     } catch {
//       alert("خطأ أثناء تحميل العملاء");
//     } finally {
//       setLoadingCustomers(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "customers") fetchCustomers();
//   }, [activeSection]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setFilteredCustomers(
//       customers.filter(
//         (c) =>
//           c.name.toLowerCase().includes(value) ||
//           c.email?.toLowerCase().includes(value)
//       )
//     );
//   };

//   // ======================= الطلبات =========================
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [errorOrders, setErrorOrders] = useState(null);

//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     setErrorOrders(null);
//     try {
//       const res = await fetch("http://localhost:4000/orders");
//       if (!res.ok) throw new Error("فشل في جلب الطلبات");
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []); // تأكد أن orders مصفوفة
//     } catch (error) {
//       setErrorOrders(error.message);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "orders") fetchOrders();
//   }, [activeSection]);

//   // ======================= الشاحنات (وهمية) =========================
//   const trucks = [
//     { id: 1, name: "شاحنة 1", plate: "ABC123" },
//     { id: 2, name: "شاحنة 2", plate: "XYZ456" },
//   ];

//   const toggleSection = (section) => {
//     setActiveSection((prev) => (prev === section ? null : section));
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         padding: 20,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255,255,255,0.5)",
//           padding: "2rem",
//           borderRadius: 12,
//           width: "85%",
//           height: "90vh",
//           maxWidth: 850,
//           overflowY: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 30 }}>لوحة تحكم الأدمن</h2>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/admin/add-funds")}>
//           ➕ إضافة رصيد للعميل
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("customers")}>
//           👥 العملاء {activeSection === "customers" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("products")}>
//           🧱 أنواع الأسمنت {activeSection === "products" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("orders")}>
//           📝 الطلبات {activeSection === "orders" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/gate")}>
//           📥 دخول وخروج الشاحنات (البوابة)
//         </button>

//         {/* ===== العملاء ===== */}
//         {activeSection === "customers" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>العملاء</h3>
//             <input
//               type="text"
//               placeholder="🔍 Search..."
//               value={searchTerm}
//               onChange={handleSearch}
//               style={{ ...inputStyle, width: "80%", marginBottom: 10 }}
//             />
//             {loadingCustomers ? (
//               <p>جاري التحميل...</p>
//             ) : (
//               <>
//                 <p>عدد العملاء: {filteredCustomers.length}</p>
//                 <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                   {filteredCustomers.map((c) => (
//                     <div key={c.customer_id} style={itemStyle}>
//                       <div>
//                         <strong>{c.name}</strong> — {c.email}
//                         <br />📞 {c.phone}
//                       </div>
//                       <div>
//                         <button style={editButtonStyle}>تعديل</button>
//                         <button style={deleteButtonStyle}>حذف</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ===== المنتجات ===== */}
//         {activeSection === "products" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>أنواع الأسمنت</h3>
//             {loadingProducts && <p>جاري التحميل...</p>}
//             {errorProducts && <p style={{ color: "red" }}>{errorProducts}</p>}

//             <form onSubmit={handleSaveProduct} style={{ marginBottom: 20 }}>
//               <input
//                 type="text"
//                 name="product_name"
//                 placeholder="اسم الأسمنت"
//                 value={productForm.product_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <input
//                 type="number"
//                 name="price_per_ton"
//                 placeholder="السعر"
//                 value={productForm.price_per_ton}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <button type="submit" style={saveButtonStyle}>
//                   {productForm.product_id ? "تعديل" : "إضافة"}
//                 </button>
//                 {productForm.product_id && (
//                   <button type="button" onClick={handleCancelEdit} style={cancelButtonStyle}>
//                     إلغاء
//                   </button>
//                 )}
//               </div>
//             </form>

//             {products.length > 0 && (
//               <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                 {products.map((product) => (
//                   <div key={product.product_id} style={itemStyle}>
//                     <div>
//                       <strong>{product.product_name}</strong> — {product.price_per_ton} ريال
//                     </div>
//                     <div>
//                       <button style={editButtonStyle} onClick={() => handleEditProduct(product)}>
//                         تعديل
//                       </button>
//                       <button
//                         style={deleteButtonStyle}
//                         onClick={() => handleDeleteProduct(product.product_id)}
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ===== الطلبات ===== */}
//         {activeSection === "orders" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>الطلبات</h3>
//             {loadingOrders ? (
//               <p>جاري التحميل...</p>
//             ) : errorOrders ? (
//               <p style={{ color: "red" }}>{errorOrders}</p>
//             ) : (
//               <>
//                 <p>عدد الطلبات: {orders.length}</p>
//                 <div style={{ maxHeight: 300, overflowY: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                       <tr>
//                         <th style={tableCellStyle}>العميل</th>
//                         <th style={tableCellStyle}>المنتج</th>
//                         <th style={tableCellStyle}>الكمية</th>
//                         <th style={tableCellStyle}>الحالة</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Array.isArray(orders) && orders.length > 0 ? (
//                         orders.map((order) => (
//                           <tr key={order.order_id}>
//                             <td style={tableCellStyle}>{order.customer_name}</td>
//                             <td style={tableCellStyle}>{order.product_name}</td>
//                             <td style={tableCellStyle}>{order.quantity}</td>
//                             <td style={tableCellStyle}>{order.status}</td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" style={tableCellStyle}>
//                             لا توجد طلبات
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // =============== تنسيقات عامة ===============
// const buttonStyle = {
//   padding: "12px 20px",
//   margin: "8px 0",
//   width: "100%",
//   fontSize: "16px",
//   borderRadius: "6px",
//   border: "none",
//   backgroundColor: "#0c007cec",
//   color: "white",
//   cursor: "pointer",
// };

// const sectionStyle = {
//   marginTop: 10,
//   padding: 15,
//   backgroundColor: "#f0f0f0ff",
//   borderRadius: 6,
//   textAlign: "left",
// };

// const fadeIn = {
//   animation: "fadeIn 0.4s ease",
// };

// const itemStyle = {
//   marginBottom: 10,
//   paddingBottom: 8,
//   borderBottom: "1px solid #ccc",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// };

// const deleteButtonStyle = {
//   backgroundColor: "#dc3545",
//   border: "none",
//   color: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   marginRight: 15,
// };

// const editButtonStyle = {
//   backgroundColor: "#0d6efd",
//   border: "none",
//   color: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   marginRight: 25,
// };

// const inputStyle = {
//   padding: 10,
//   marginBottom: 10,
//   width: "calc(50% - 10px)",
//   marginRight: 10,
//   borderRadius: 5,
//   border: "1px solid #ccc",
// };

// const saveButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#198754",
//   color: "white",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
//   marginRight: 10,
// };

// const cancelButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#6c757d",
//   color: "white",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
// };

// const tableCellStyle = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   textAlign: "center",
// };

// import React, { useState, useEffect } from "react";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// export default function AdminManage() {
//   const [activeSection, setActiveSection] = useState(null);

//   // ======================= المنتجات =========================
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [errorProducts, setErrorProducts] = useState(null);

//   const [productForm, setProductForm] = useState({
//     product_id: null,
//     product_name: "",
//     price_per_ton: "",
//   });

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     setErrorProducts(null);
//     try {
//       const res = await fetch("http://localhost:4000/products");
//       if (!res.ok) throw new Error("خطأ في جلب المنتجات");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       setErrorProducts(error.message);
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "products") fetchProducts();
//   }, [activeSection]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditProduct = (product) => {
//     setProductForm({
//       product_id: product.product_id,
//       product_name: product.product_name,
//       price_per_ton: product.price_per_ton.toString(),
//     });
//   };

//   const handleCancelEdit = () => {
//     setProductForm({ product_id: null, product_name: "", price_per_ton: "" });
//   };

//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
//     try {
//       const res = await fetch(`http://localhost:4000/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("فشل في حذف المنتج");
//       alert("تم حذف المنتج بنجاح");
//       fetchProducts();
//       if (productForm.product_id === id) handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleSaveProduct = async (e) => {
//     e.preventDefault();

//     if (!productForm.product_name.trim() || !productForm.price_per_ton) {
//       alert("يرجى إدخال اسم المنتج والسعر بشكل صحيح");
//       return;
//     }

//     const price = parseFloat(productForm.price_per_ton);
//     if (isNaN(price) || price <= 0) {
//       alert("السعر يجب أن يكون رقماً أكبر من صفر");
//       return;
//     }

//     try {
//       let res;
//       if (productForm.product_id) {
//         res = await fetch(`http://localhost:4000/products/${productForm.product_id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       } else {
//         res = await fetch("http://localhost:4000/products", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             product_name: productForm.product_name.trim(),
//             price_per_ton: price,
//           }),
//         });
//       }

//       if (!res.ok) throw new Error("حدث خطأ أثناء الحفظ");

//       alert(productForm.product_id ? "تم تعديل المنتج" : "تمت الإضافة بنجاح");
//       fetchProducts();
//       handleCancelEdit();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   // ======================= العملاء =========================
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loadingCustomers, setLoadingCustomers] = useState(false);

//   const fetchCustomers = async () => {
//     setLoadingCustomers(true);
//     try {
//       const res = await fetch("http://localhost:4000/customers");
//       if (!res.ok) throw new Error("فشل في جلب العملاء");
//       const data = await res.json();
//       setCustomers(data);
//       setFilteredCustomers(data);
//     } catch {
//       alert("خطأ أثناء تحميل العملاء");
//     } finally {
//       setLoadingCustomers(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "customers") fetchCustomers();
//   }, [activeSection]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setFilteredCustomers(
//       customers.filter(
//         (c) =>
//           c.name.toLowerCase().includes(value) ||
//           c.email?.toLowerCase().includes(value)
//       )
//     );
//   };

//   // ======================= الطلبات =========================
//   const [orders, setOrders] = useState([]);
//   const [loadingOrders, setLoadingOrders] = useState(false);
//   const [errorOrders, setErrorOrders] = useState(null);

//   const fetchOrders = async () => {
//     setLoadingOrders(true);
//     setErrorOrders(null);
//     try {
//       const res = await fetch("http://localhost:4000/orders");
//       if (!res.ok) throw new Error("فشل في جلب الطلبات");
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []); // تأكد أن orders مصفوفة
//     } catch (error) {
//       setErrorOrders(error.message);
//     } finally {
//       setLoadingOrders(false);
//     }
//   };

//   useEffect(() => {
//     if (activeSection === "orders") fetchOrders();
//   }, [activeSection]);

//   // ======================= الشاحنات (وهمية) =========================
//   const trucks = [
//     { id: 1, name: "شاحنة 1", plate: "ABC123" },
//     { id: 2, name: "شاحنة 2", plate: "XYZ456" },
//   ];

//   const toggleSection = (section) => {
//     setActiveSection((prev) => (prev === section ? null : section));
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         padding: 20,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255,255,255,0.5)",
//           padding: "2rem",
//           borderRadius: 12,
//           width: "85%",
//           height: "90vh",
//           maxWidth: 850,
//           overflowY: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: 30 }}>لوحة تحكم الأدمن</h2>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/admin/add-funds")}>
//           ➕ إضافة رصيد للعميل
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("customers")}>
//           👥 العملاء {activeSection === "customers" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("products")}>
//           🧱 أنواع الأسمنت {activeSection === "products" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => toggleSection("orders")}>
//           📝 الطلبات {activeSection === "orders" ? "▲" : "▼"}
//         </button>

//         <button style={buttonStyle} onClick={() => (window.location.href = "/gate")}>
//           📥 دخول وخروج الشاحنات (البوابة)
//         </button>

//         {/* ===== العملاء ===== */}
//         {activeSection === "customers" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>العملاء</h3>
//             <input
//               type="text"
//               placeholder="🔍 Search..."
//               value={searchTerm}
//               onChange={handleSearch}
//               style={{ ...inputStyle, width: "80%", marginBottom: 10 }}
//             />
//             {loadingCustomers ? (
//               <p>جاري التحميل...</p>
//             ) : (
//               <>
//                 <p>عدد العملاء: {filteredCustomers.length}</p>
//                 <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                   {filteredCustomers.map((c) => (
//                     <div key={c.customer_id} style={itemStyle}>
//                       <div>
//                         <strong>{c.name}</strong> — {c.email}
//                         <br />📞 {c.phone}
//                       </div>
//                       <div>
//                         <button style={editButtonStyle}>تعديل</button>
//                         <button style={deleteButtonStyle}>حذف</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ===== المنتجات ===== */}
//         {activeSection === "products" && (
//           <div style={{ ...sectionStyle, ...fadeIn, direction: "ltr" }}>
//             <h3>أنواع الأسمنت</h3>
//             {loadingProducts && <p>جاري التحميل...</p>}
//             {errorProducts && <p style={{ color: "red" }}>{errorProducts}</p>}

//             <form onSubmit={handleSaveProduct} style={{ marginBottom: 20 }}>
//               <input
//                 type="text"
//                 name="product_name"
//                 placeholder="اسم الأسمنت"
//                 value={productForm.product_name}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <input
//                 type="number"
//                 name="price_per_ton"
//                 placeholder="السعر"
//                 value={productForm.price_per_ton}
//                 onChange={handleInputChange}
//                 style={inputStyle}
//               />
//               <div style={{ marginTop: 10 }}>
//                 <button type="submit" style={saveButtonStyle}>
//                   {productForm.product_id ? "تعديل" : "إضافة"}
//                 </button>
//                 {productForm.product_id && (
//                   <button type="button" onClick={handleCancelEdit} style={cancelButtonStyle}>
//                     إلغاء
//                   </button>
//                 )}
//               </div>
//             </form>

//             {products.length > 0 && (
//               <div style={{ maxHeight: 250, overflowY: "auto" }}>
//                 {products.map((product) => (
//                   <div key={product.product_id} style={itemStyle}>
//                     <div>
//                       <strong>{product.product_name}</strong> — {product.price_per_ton} ريال
//                     </div>
//                     <div>
//                       <button style={editButtonStyle} onClick={() => handleEditProduct(product)}>
//                         تعديل
//                       </button>
//                       <button
//                         style={deleteButtonStyle}
//                         onClick={() => handleDeleteProduct(product.product_id)}
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* ===== الطلبات ===== */}

//       </div>
//     </div>
//   );
// }

// // =============== تنسيقات عامة ===============
// const buttonStyle = {
//   padding: "12px 20px",
//   margin: "8px 0",
//   width: "100%",
//   fontSize: "16px",
//   borderRadius: "6px",
//   border: "none",
//   backgroundColor: "#0c007cec",
//   color: "white",
//   cursor: "pointer",
// };

// const sectionStyle = {
//   marginTop: 10,
//   padding: 15,
//   backgroundColor: "#f0f0f0ff",
//   borderRadius: 6,
//   textAlign: "left",
// };

// const fadeIn = {
//   animation: "fadeIn 0.4s ease",
// };

// const itemStyle = {
//   marginBottom: 10,
//   paddingBottom: 8,
//   borderBottom: "1px solid #ccc",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// };

// const deleteButtonStyle = {
//   backgroundColor: "#dc3545",
//   border: "none",
//   color: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   marginRight: 15,
// };

// const editButtonStyle = {
//   backgroundColor: "#0d6efd",
//   border: "none",
//   color: "white",
//   padding: "4px 8px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   marginRight: 25,
// };

// const inputStyle = {
//   padding: 10,
//   marginBottom: 10,
//   width: "calc(50% - 10px)",
//   marginRight: 10,
//   borderRadius: 5,
//   border: "1px solid #ccc",
// };

// const saveButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#198754",
//   color: "white",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
//   marginRight: 10,
// };

// const cancelButtonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#6c757d",
//   color: "white",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
// };

// const tableCellStyle = {
//   border: "1px solid #ccc",
//   padding: "8px",
//   textAlign: "center",
// };

// import React, { useEffect, useState, useRef , useCallback} from "react";
// import API_BASE_URL from "../config";
// import { QRCodeCanvas } from "qrcode.react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("orders");
//   const qrRef = useRef();
//   const [customers, setCustomers] = useState([]);

//   const buttonStyle = {
//     padding: "8px 16px",
//     backgroundColor: "#034b97",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "16px",
//   };

//   useEffect(() => {
//     if (activeTab === "orders") {
//       fetchOrders();
//     }
//   }, [activeTab]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/orders`);
//       if (!res.ok) throw new Error("فشل جلب الطلبات");
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         setError("لم نستطع جلب الطلبات");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // دالة جلب العملاء
// const fetchCustomers = useCallback(async () => {
//   try {
//     setLoading(true);
//     const res = await fetch(`${API_BASE_URL}/customers`);
//     if (!res.ok) throw new Error("فشل الاتصال بالخادم");
//     const data = await res.json();

//     let customerList = Array.isArray(data)
//       ? data
//       : data.customers || data.data || [];

//     setCustomers(customerList);
//     await fetchCustomerWallets(customerList);
//   } catch (err) {
//     console.error(err);
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// }, []); // ← مهم جدًا، نخليه فاضي حتى يثبت المرجع ولا يعيد تعريفها

// // جلب رصيد كل عميل من API CustomerWallet
// const fetchCustomerWallets = async (customerList) => {
//   const updated = await Promise.all(
//     customerList.map(async (customer) => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customer.customer_id}`);
//         if (!res.ok) throw new Error("فشل جلب الرصيد");
//         const data = await res.json();
//         // نحاول معرفة اسم الحقل الذي يحتوي الرصيد
//        const balance = data.wallet?.TotalBalance || data.TotalBalance || 0;

//         return { ...customer, wallet_balance: balance };
//       } catch (err) {
//         console.error(`خطأ في جلب رصيد العميل ${customer.customer_id}:`, err);
//         return { ...customer, wallet_balance: 0 };
//       }
//     })
//   );
//   setCustomers(updated);
// };

// // استدعاء العملاء عند تفعيل تبويب العملاء

// useEffect(() => {
//   if (activeTab === "customers") {
//     fetchCustomers();
//   }
// }, [activeTab, fetchCustomers]);

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
//       pdf.save("QRCode.pdf");
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "#007bff";
//       case "in_progress":
//         return "#fd7e14";
//       case "done":
//         return "#28a745";
//       default:
//         return "#dc3545";
//     }
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.order_id.toString().includes(searchTerm.trim())
//   );

//   const newCount = filteredOrders.filter((order) => order.status === "new").length;
//   const inProgressCount = filteredOrders.filter((order) => order.status === "in_progress").length;
//   const doneCount = filteredOrders.filter((order) => order.status === "done").length;

//   const selectedOrder = orders.find((o) => o.order_id === selectedOrderId);

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         minHeight: "100vh",
//         padding: "2rem",
//         direction: "rtl",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.48)",
//           padding: "2rem",
//           borderRadius: "12px",
//           maxWidth: "1200px",
//           margin: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
//           لوحة التحكم (الأدمن)
//         </h2>

//         {/* أزرار التحكم */}
//         <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//           <button
//             onClick={() => setActiveTab("addBalance")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "addBalance" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             إضافة رصيد للعميل
//           </button>

//           <button
//             onClick={() => setActiveTab("customers")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "customers" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             العملاء
//           </button>

//           <button
//             onClick={() => setActiveTab("loginPortal")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "loginPortal" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             بوابة الدخول والخروج
//           </button>

//           <button
//             onClick={() => setActiveTab("orders")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "orders" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             الطلبات
//           </button>
//         </div>

//         {/* المحتوى حسب الزر النشط */}
//         <div>
//           {/* شاشة إضافة رصيد */}
//           {activeTab === "addBalance" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 onClick={() => (window.location.href = "/admin/add-funds")}
//                 style={buttonStyle}
//               >
//                 ➕ إضافة رصيد للعميل
//               </button>
//             </div>
//           )}

//     {/* العملاء */}

// {/* العملاء */}
// {activeTab === "customers" && (
//   <div style={{ marginTop: "30px", direction: "rtl" }}>
//     <h3 style={{ textAlign: "center" }}>📋 قائمة العملاء</h3>

//     <input
//       type="text"
//       placeholder="🔍 ابحث بالاسم أو البريد أو رقم الجوال..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       style={{
//         padding: "10px",
//         width: "80%",
//         margin: "20px auto",
//         display: "block",
//         borderRadius: "8px",
//         border: "1px solid #ccc",
//         textAlign: "center",
//       }}
//     />

//     {loading ? (
//       <p style={{ textAlign: "center" }}>⏳ جاري تحميل قائمة العملاء...</p>
//     ) : error ? (
//       <p style={{ textAlign: "center", color: "red" }}>{error}</p>
//     ) : customers.length === 0 ? (
//       <p style={{ textAlign: "center" }}>❌ لا يوجد عملاء حالياً.</p>
//     ) : (
//       <table
//         border="1"
//         cellPadding="8"
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           textAlign: "center",
//           backgroundColor: "#fff",
//         }}
//       >
//         <thead style={{ backgroundColor: "#2c3e50" , color: "#fff" }}>
//           <tr>
//             <th>رقم العميل</th>
//             <th>الاسم</th>
//             <th>البريد الإلكتروني</th>
//             <th>رقم الجوال</th>
//             <th>الرصيد الحالي</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers
//             .filter((c) =>
//               [c.name, c.email, c.phone]
//                 .some((field) =>
//                   field?.toLowerCase().includes(searchTerm.toLowerCase())
//                 )
//             )
//             .map((c) => (
//               <tr key={c.customer_id}>
//                 <td>{c.customer_id}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//                 <td>
//                   {c.wallet_balance !== undefined
//                     ? `${c.wallet_balance} ريال`
//                     : "جاري التحميل..."}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// )}

//           {/* بوابة الدخول والخروج */}
//           {activeTab === "loginPortal" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 style={buttonStyle}
//                 onClick={() => (window.location.href = "/gate")}
//               >
//                 📥 دخول وخروج الشاحنات (البوابة)
//               </button>
//             </div>
//           )}

//           {/* الطلبات */}
//           {activeTab === "orders" && (
//             <div>
//               <div style={{ marginBottom: "1rem", textAlign: "center" }}>
//                 <input
//                   type="text"
//                   placeholder="ابحث برقم الطلب..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{
//                     padding: "8px",
//                     width: "250px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                     textAlign: "center",
//                   }}
//                 />
//               </div>

//               {loading ? (
//                 <p>جاري تحميل الطلبات...</p>
//               ) : error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//               ) : filteredOrders.length === 0 ? (
//                 <p>لا توجد طلبات مطابقة للبحث.</p>
//               ) : (
//                 <>
//                   <strong>
//                     <p
//                       style={{
//                         marginBottom: "0.5rem",
//                         color: "#ffffffff",
//                         backgroundColor: "#001020be",
//                         width: 150,
//                         height: 50,
//                         textAlign: "center",
//                         padding: "10px 20px",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         minWidth: "120px",
//                         justifyContent: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       عدد الطلبات: {filteredOrders.length}
//                     </p>
//                   </strong>

//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "20px",
//                       marginBottom: "1.5rem",
//                     }}
//                   >
//                     <div
//                       style={{
//                         backgroundColor: "#001020be",
//                         color: "#007bff",
//                         padding: "10px 20px",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         minWidth: "120px",
//                         justifyContent: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "16px",
//                           height: "16px",
//                           borderRadius: "50%",
//                           backgroundColor: "#007bff",
//                         }}
//                       ></div>
//                       جديد: {newCount}
//                     </div>

//                     <div
//                       style={{
//                         backgroundColor: "#001020be",
//                         color: "#fd7e14",
//                         padding: "10px 20px",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         minWidth: "140px",
//                         justifyContent: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "16px",
//                           height: "16px",
//                           borderRadius: "50%",
//                           backgroundColor: "#fd7e14",
//                         }}
//                       ></div>
//                       قيد التنفيذ: {inProgressCount}
//                     </div>

//                     <div
//                       style={{
//                         backgroundColor: "#001020be",
//                         color: "#28a745",
//                         padding: "10px 20px",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         minWidth: "120px",
//                         justifyContent: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "16px",
//                           height: "16px",
//                           borderRadius: "50%",
//                           backgroundColor: "#28a745",
//                         }}
//                       ></div>
//                       منتهي: {doneCount}
//                     </div>
//                   </div>

//                   <table
//                     border="1"
//                     cellPadding="8"
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: "14px",
//                       textAlign: "center",
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     <thead style={{ backgroundColor: "#2c3e50ff" , color: "white",}}>
//                       <tr>
//                         <th>رقم الطلب</th>
//                         <th>رقم العميل</th>
//                         <th>نوع الأسمنت</th>
//                         <th>الكمية (طن)</th>
//                         <th>تاريخ تحميل الأسمنت</th>
//                         <th>المبلغ الإجمالي</th>
//                         <th>الحالة</th>
//                         <th>الباركود</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredOrders.map((order) => (
//                         <tr key={order.order_id}>
//                           <td>{order.order_id}</td>
//                           <td>{order.customer_id}</td>
//                           <td>{order.cement_type}</td>
//                           <td>{order.quantity}</td>
//                           <td>
//                             {order.delivery_date
//                               ? new Date(order.delivery_date).toLocaleDateString()
//                               : "-"}
//                           </td>
//                           <td>{order.total_cost}</td>
//                           <td
//                             style={{
//                               fontWeight: "bold",
//                               color: getStatusColor(order.status),
//                             }}
//                           >
//                             {order.status}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() =>
//                                 setSelectedOrderId((prev) =>
//                                   prev === order.order_id ? null : order.order_id
//                                 )
//                               }
//                               style={{
//                                 padding: "6px 12px",
//                                 fontSize: "13px",
//                                 backgroundColor: "#034b97e1",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {selectedOrderId === order.order_id ? "إخفاء" : "عرض"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {selectedOrderId && selectedOrder && (
//                     <div
//                       onClick={() => setSelectedOrderId(null)}
//                       style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100vw",
//                         height: "100vh",
//                         backgroundColor: "rgba(0,0,0,0.3)",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         zIndex: 9999,
//                       }}
//                     >
//                       <div
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                           width: "350px",
//                           backgroundColor: "#fff",
//                           padding: "1.5rem",
//                           borderRadius: "12px",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                           textAlign: "center",
//                           position: "relative",
//                         }}
//                       >
//                         <button
//                           onClick={() => setSelectedOrderId(null)}
//                           style={{
//                             position: "absolute",
//                             top: "8px",
//                             right: "12px",
//                             background: "transparent",
//                             border: "none",
//                             fontSize: "24px",
//                             fontWeight: "bold",
//                             cursor: "pointer",
//                             color: "#333",
//                             lineHeight: "1",
//                           }}
//                         >
//                           &times;
//                         </button>
//                         <h3>رقم الطلب: {selectedOrder.order_id}</h3>
//                         <QRCodeCanvas
//                           id="qrCode"
//                           value={selectedOrder.order_id.toString()}
//                           size={200}
//                           level="H"
//                           includeMargin={true}
//                           ref={qrRef}
//                         />
//                         <div style={{ marginTop: "15px" }}>
//                           <button
//                             style={buttonStyle}
//                             onClick={handleDownloadPdf}
//                           >
//                             تحميل الباركود PDF
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// import React, { useEffect, useState, useRef , useCallback} from "react";
// import API_BASE_URL from "../config";
// import { QRCodeCanvas } from "qrcode.react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("orders");
//   const qrRef = useRef();
//   const [customers, setCustomers] = useState([]);

//   // ✅ إعداد البيجينايشن
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 25; // ← 25 طلب في كل صفحة

//   const buttonStyle = {
//     padding: "8px 16px",
//     backgroundColor: "#034b97",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "16px",
//   };

//   useEffect(() => {
//     if (activeTab === "orders") {
//       fetchOrders();
//     }
//   }, [activeTab]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/orders`);
//       if (!res.ok) throw new Error("فشل جلب الطلبات");
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//       } else {
//         setError("لم نستطع جلب الطلبات");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // جلب العملاء
//   const fetchCustomers = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/customers`);
//       if (!res.ok) throw new Error("فشل الاتصال بالخادم");
//       const data = await res.json();
//       let customerList = Array.isArray(data)
//         ? data
//         : data.customers || data.data || [];
//       setCustomers(customerList);
//       await fetchCustomerWallets(customerList);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchCustomerWallets = async (customerList) => {
//     const updated = await Promise.all(
//       customerList.map(async (customer) => {
//         try {
//           const res = await fetch(`${API_BASE_URL}/wallet/${customer.customer_id}`);
//           if (!res.ok) throw new Error("فشل جلب الرصيد");
//           const data = await res.json();
//           const balance = data.wallet?.TotalBalance || data.TotalBalance || 0;
//           return { ...customer, wallet_balance: balance };
//         } catch (err) {
//           console.error(`خطأ في جلب رصيد العميل ${customer.customer_id}:`, err);
//           return { ...customer, wallet_balance: 0 };
//         }
//       })
//     );
//     setCustomers(updated);
//   };

//   useEffect(() => {
//     if (activeTab === "customers") {
//       fetchCustomers();
//     }
//   }, [activeTab, fetchCustomers]);

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
//       pdf.save("QRCode.pdf");
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "#007bff";
//       case "in_progress":
//         return "#fd7e14";
//       case "done":
//         return "#28a745";
//       default:
//         return "#dc3545";
//     }
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.order_id.toString().includes(searchTerm.trim())
//   );

//   // ✅ منطق البيجينايشن للطلبات فقط
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const newCount = filteredOrders.filter((order) => order.status === "new").length;
//   const inProgressCount = filteredOrders.filter((order) => order.status === "in_progress").length;
//   const doneCount = filteredOrders.filter((order) => order.status === "done").length;

//   const selectedOrder = orders.find((o) => o.order_id === selectedOrderId);

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         minHeight: "100vh",
//         padding: "2rem",
//         direction: "rtl",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.48)",
//           padding: "2rem",
//           borderRadius: "12px",
//           maxWidth: "1200px",
//           margin: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
//           لوحة التحكم (الأدمن)
//         </h2>

//         {/* أزرار التبويبات */}
//         <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
//           <button
//             onClick={() => setActiveTab("addBalance")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "addBalance" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             إضافة رصيد للعميل
//           </button>

//           <button
//             onClick={() => setActiveTab("customers")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "customers" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             العملاء
//           </button>

//           <button
//             onClick={() => setActiveTab("loginPortal")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "loginPortal" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             بوابة الدخول والخروج
//           </button>

//           <button
//             onClick={() => setActiveTab("orders")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "orders" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             الطلبات
//           </button>
//         </div>

//         {/* ✅ المحتوى حسب الزر النشط */}
//         <div>
//           {/* تبويب إضافة رصيد */}
//           {activeTab === "addBalance" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 onClick={() => (window.location.href = "/admin/add-funds")}
//                 style={buttonStyle}
//               >
//                 ➕ إضافة رصيد للعميل
//               </button>
//             </div>
//           )}

//           {/* تبويب العملاء */}
//           {activeTab === "customers" && (
//             <div style={{ marginTop: "30px", direction: "rtl" }}>
//               <h3 style={{ textAlign: "center" }}>📋 قائمة العملاء</h3>

//               <input
//                 type="text"
//                 placeholder="🔍 ابحث بالاسم أو البريد أو رقم الجوال..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: "10px",
//                   width: "80%",
//                   margin: "20px auto",
//                   display: "block",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   textAlign: "center",
//                 }}
//               />

//               {loading ? (
//                 <p style={{ textAlign: "center" }}>⏳ جاري تحميل قائمة العملاء...</p>
//               ) : error ? (
//                 <p style={{ textAlign: "center", color: "red" }}>{error}</p>
//               ) : customers.length === 0 ? (
//                 <p style={{ textAlign: "center" }}>❌ لا يوجد عملاء حالياً.</p>
//               ) : (
//                 <table
//                   border="1"
//                   cellPadding="8"
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     textAlign: "center",
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <thead style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                     <tr>
//                       <th>رقم العميل</th>
//                       <th>الاسم</th>
//                       <th>البريد الإلكتروني</th>
//                       <th>رقم الجوال</th>
//                       <th>الرصيد الحالي</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {customers
//                       .filter((c) =>
//                         [c.name, c.email, c.phone].some((field) =>
//                           field?.toLowerCase().includes(searchTerm.toLowerCase())
//                         )
//                       )
//                       .map((c) => (
//                         <tr key={c.customer_id}>
//                           <td>{c.customer_id}</td>
//                           <td>{c.name}</td>
//                           <td>{c.email}</td>
//                           <td>{c.phone}</td>
//                           <td>
//                             {c.wallet_balance !== undefined
//                               ? `${c.wallet_balance} ريال`
//                               : "جاري التحميل..."}
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           )}

//           {/* تبويب البوابة */}
//           {activeTab === "loginPortal" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 style={buttonStyle}
//                 onClick={() => (window.location.href = "/gate")}
//               >
//                 📥 دخول وخروج الشاحنات (البوابة)
//               </button>
//             </div>
//           )}

//           {/* تبويب الطلبات (مع البيجينايشن) */}
//           {activeTab === "orders" && (
//             <div>
//               <div style={{ marginBottom: "1rem", textAlign: "center" }}>
//                 <input
//                   type="text"
//                   placeholder="ابحث برقم الطلب..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   style={{
//                     padding: "8px",
//                     width: "250px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                     textAlign: "center",
//                   }}
//                 />
//               </div>

//               {loading ? (
//                 <p>جاري تحميل الطلبات...</p>
//               ) : error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//               ) : filteredOrders.length === 0 ? (
//                 <p>لا توجد طلبات مطابقة للبحث.</p>
//               ) : (
//                 <>
//                   <p
//                     style={{
//                       marginBottom: "0.5rem",
//                       color: "#fff",
//                       backgroundColor: "#001020be",
//                       width: 150,
//                       height: 50,
//                       textAlign: "center",
//                       padding: "10px 20px",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     عدد الطلبات: {filteredOrders.length}
//                   </p>

//                   <table
//                     border="1"
//                     cellPadding="8"
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: "14px",
//                       textAlign: "center",
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     <thead style={{ backgroundColor: "#2c3e50ff", color: "white" }}>
//                       <tr>
//                         <th>رقم الطلب</th>
//                         <th>رقم العميل</th>
//                         <th>نوع الأسمنت</th>
//                         <th>الكمية (طن)</th>
//                         <th>تاريخ التحميل</th>
//                         <th>المبلغ الإجمالي</th>
//                         <th>الحالة</th>
//                         <th>الباركود</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentOrders.map((order) => (
//                         <tr key={order.order_id}>
//                           <td>{order.order_id}</td>
//                           <td>{order.customer_id}</td>
//                           <td>{order.cement_type}</td>
//                           <td>{order.quantity}</td>
//                           <td>
//                             {order.delivery_date
//                               ? new Date(order.delivery_date).toLocaleDateString()
//                               : "-"}
//                           </td>
//                           <td>{order.total_cost}</td>
//                           <td style={{ fontWeight: "bold", color: getStatusColor(order.status) }}>
//                             {order.status}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() =>
//                                 setSelectedOrderId((prev) =>
//                                   prev === order.order_id ? null : order.order_id
//                                 )
//                               }
//                               style={{
//                                 padding: "6px 12px",
//                                 fontSize: "13px",
//                                 backgroundColor: "#034b97e1",
//                                 color: "#fff",
//                                 border: "none",
//                                 borderRadius: "4px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {selectedOrderId === order.order_id ? "إخفاء" : "عرض"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {/* ✅ أزرار البيجينايشن */}
//                   <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <button
//                       onClick={goToPrevPage}
//                       disabled={currentPage === 1}
//                       style={{
//                         padding: "8px 16px",
//                         margin: "0 5px",
//                         borderRadius: "6px",
//                         backgroundColor: currentPage === 1 ? "#ccc" : "#034b97",
//                         color: "#fff",
//                         border: "none",
//                         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       السابق
//                     </button>

//                     {[...Array(totalPages)].map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentPage(index + 1)}
//                         style={{
//                           padding: "8px 12px",
//                           margin: "0 3px",
//                           borderRadius: "6px",
//                           border: "1px solid #034b97",
//                           backgroundColor: currentPage === index + 1 ? "#034b97" : "#fff",
//                           color: currentPage === index + 1 ? "#fff" : "#034b97",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}

//                     <button
//                       onClick={goToNextPage}
//                       disabled={currentPage === totalPages}
//                       style={{
//                         padding: "8px 16px",
//                         margin: "0 5px",
//                         borderRadius: "6px",
//                         backgroundColor: currentPage === totalPages ? "#ccc" : "#034b97",
//                         color: "#fff",
//                         border: "none",
//                         cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       التالي
//                     </button>
//                   </div>

//                   {/* نافذة QR */}
//                   {selectedOrderId && selectedOrder && (
//                     <div
//                       onClick={() => setSelectedOrderId(null)}
//                       style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100vw",
//                         height: "100vh",
//                         backgroundColor: "rgba(0,0,0,0.3)",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         zIndex: 9999,
//                       }}
//                     >
//                       <div
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                           width: "350px",
//                           backgroundColor: "#fff",
//                           padding: "1.5rem",
//                           borderRadius: "12px",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                           textAlign: "center",
//                           position: "relative",
//                         }}
//                       >
//                         <button
//                           onClick={() => setSelectedOrderId(null)}
//                           style={{
//                             position: "absolute",
//                             top: "8px",
//                             right: "12px",
//                             background: "transparent",
//                             border: "none",
//                             fontSize: "24px",
//                             fontWeight: "bold",
//                             cursor: "pointer",
//                             color: "#333",
//                           }}
//                         >
//                           ×
//                         </button>

//                         <div ref={qrRef}>
//                           <QRCodeCanvas
//                             value={`${window.location.origin}/gate?order_id=${selectedOrder.order_id}`}
//                             size={220}
//                           />
//                           <p style={{ marginTop: "10px", fontWeight: "bold" }}>
//                             رقم الطلب: {selectedOrder.order_id}
//                           </p>
//                         </div>

//                         <button
//                           onClick={handleDownloadPdf}
//                           style={{
//                             marginTop: "15px",
//                             padding: "8px 16px",
//                             backgroundColor: "#034b97",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           تحميل QR كـ PDF
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



// import React, { useEffect, useState, useRef, useCallback } from "react";
// import API_BASE_URL from "../config";
// import { QRCodeCanvas } from "qrcode.react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function AdminDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("orders");
//   const qrRef = useRef();
//   const [customers, setCustomers] = useState([]);

//   // إعداد البيجينايشن
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12; // 25 طلب في كل صفحة
//   const [totalPages, setTotalPages] = useState(1);

//   const buttonStyle = {
//     padding: "8px 16px",
//     backgroundColor: "#034b97",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "16px",
//   };

//   useEffect(() => {
//     if (activeTab === "orders") {
//       fetchOrders(1);
//     }
//   }, [activeTab]);

//   const fetchOrders = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch(
//         `${API_BASE_URL}/orders?page=${page}&limit=${itemsPerPage}`
//       );
//       if (!res.ok) throw new Error("فشل جلب الطلبات");
//       const data = await res.json();
//       if (data.success) {
//         setOrders(data.orders);
//         const total = data.totalOrders || data.total || 0;
//         setTotalPages(Math.ceil(total / itemsPerPage));
//         setTotalOrdersCount(total);
//       } else {
//         setError("لم نستطع جلب الطلبات");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCustomers = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/customers`);
//       if (!res.ok) throw new Error("فشل الاتصال بالخادم");
//       const data = await res.json();
//       let customerList = Array.isArray(data)
//         ? data
//         : data.customers || data.data || [];
//       setCustomers(customerList);
//       await fetchCustomerWallets(customerList);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchCustomerWallets = async (customerList) => {
//     const updated = await Promise.all(
//       customerList.map(async (customer) => {
//         try {
//           const res = await fetch(
//             `${API_BASE_URL}/wallet/${customer.customer_id}`
//           );
//           if (!res.ok) throw new Error("فشل جلب الرصيد");
//           const data = await res.json();
//           const balance = data.wallet?.TotalBalance || data.TotalBalance || 0;
//           return { ...customer, wallet_balance: balance };
//         } catch (err) {
//           console.error(`خطأ في جلب رصيد العميل ${customer.customer_id}:`, err);
//           return { ...customer, wallet_balance: 0 };
//         }
//       })
//     );
//     setCustomers(updated);
//   };

//   useEffect(() => {
//     if (activeTab === "customers") {
//       fetchCustomers();
//     }
//   }, [activeTab, fetchCustomers]);

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
//       pdf.save("QRCode.pdf");
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "#007bff";
//       case "in_progress":
//         return "#fd7e14";
//       case "done":
//         return "#28a745";
//       default:
//         return "#dc3545";
//     }
//   };

//   // نقوم بالفلترة بالبحث قبل العرض
//   const filteredOrders = orders.filter((order) =>
//     order.order_id.toString().includes(searchTerm.trim())
//   );

//   const newCount = filteredOrders.filter(
//     (order) => order.status === "new"
//   ).length;
//   const inProgressCount = filteredOrders.filter(
//     (order) => order.status === "in_progress"
//   ).length;
//   const doneCount = filteredOrders.filter(
//     (order) => order.status === "done"
//   ).length;
//   const [totalOrdersCount, setTotalOrdersCount] = useState(0);

//   const selectedOrder = orders.find((o) => o.order_id === selectedOrderId);

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         minHeight: "100vh",
//         padding: "2rem",
//         direction: "rtl",
//         position: "relative",
//         overflowX: "hidden",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.48)",
//           padding: "2rem",
//           borderRadius: "12px",
//           maxWidth: "1200px",
//           margin: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "1rem",
//             color: "#2c3e50",
//           }}
//         >
//           لوحة التحكم (الأدمن)
//         </h2>

//         {/* أزرار التبويبات */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "15px",
//             marginBottom: "20px",
//           }}
//         >
//           <button
//             onClick={() => setActiveTab("addBalance")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor:
//                 activeTab === "addBalance" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             إضافة رصيد للعميل
//           </button>

//           <button
//             onClick={() => setActiveTab("customers")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor:
//                 activeTab === "customers" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             العملاء
//           </button>

//           <button
//             onClick={() => setActiveTab("loginPortal")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor:
//                 activeTab === "loginPortal" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             بوابة الدخول والخروج
//           </button>

//           <button
//             onClick={() => setActiveTab("orders")}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: activeTab === "orders" ? "#034b97" : "#001020be",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             الطلبات
//           </button>
//         </div>

//         {/* المحتوى حسب الزر النشط */}
//         <div>
//           {/* تبويب إضافة رصيد */}
//           {activeTab === "addBalance" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 onClick={() => (window.location.href = "/admin/add-funds")}
//                 style={buttonStyle}
//               >
//                 ➕ إضافة رصيد للعميل
//               </button>
//             </div>
//           )}

//           {/* تبويب العملاء */}
//           {activeTab === "customers" && (
//             <div style={{ marginTop: "30px", direction: "rtl" }}>
//               <h3 style={{ textAlign: "center" }}>📋 قائمة العملاء</h3>

//               <input
//                 type="text"
//                 placeholder="🔍 ابحث بالاسم أو البريد أو رقم الجوال..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   padding: "10px",
//                   width: "80%",
//                   margin: "20px auto",
//                   display: "block",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   textAlign: "center",
//                 }}
//               />

//               {loading ? (
//                 <p style={{ textAlign: "center" }}>
//                   ⏳ جاري تحميل قائمة العملاء...
//                 </p>
//               ) : error ? (
//                 <p style={{ textAlign: "center", color: "red" }}>{error}</p>
//               ) : customers.length === 0 ? (
//                 <p style={{ textAlign: "center" }}>❌ لا يوجد عملاء حالياً.</p>
//               ) : (
//                 <table
//                   border="1"
//                   cellPadding="8"
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     textAlign: "center",
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <thead style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
//                     <tr>
//                       <th>رقم العميل</th>
//                       <th>الاسم</th>
//                       <th>البريد الإلكتروني</th>
//                       <th>رقم الجوال</th>
//                       <th>الرصيد الحالي</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {customers
//                       .filter((c) =>
//                         [c.name, c.email, c.phone].some((field) =>
//                           field
//                             ?.toLowerCase()
//                             .includes(searchTerm.toLowerCase())
//                         )
//                       )
//                       .map((c) => (
//                         <tr key={c.customer_id}>
//                           <td>{c.customer_id}</td>
//                           <td>{c.name}</td>
//                           <td>{c.email}</td>
//                           <td>{c.phone}</td>
//                           <td>
//                             {c.wallet_balance !== undefined
//                               ? `${c.wallet_balance} ريال`
//                               : "جاري التحميل..."}
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           )}

//           {/* تبويب البوابة */}
//           {activeTab === "loginPortal" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button
//                 style={buttonStyle}
//                 onClick={() => (window.location.href = "/gate")}
//               >
//                 📥 دخول وخروج الشاحنات (البوابة)
//               </button>
//             </div>
//           )}

//           {/* تبويب الطلبات (مع البيجينايشن) */}
//           {activeTab === "orders" && (
//             <div>
//               <div style={{ marginBottom: "1rem", textAlign: "center" }}>
//                 <input
//                   type="text"
//                   placeholder="ابحث برقم الطلب..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                     fetchOrders(1);
//                   }}
//                   style={{
//                     padding: "8px",
//                     width: "250px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                     textAlign: "center",
//                   }}
//                 />
//               </div>

//               {loading ? (
//                 <p>جاري تحميل الطلبات...</p>
//               ) : error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//               ) : filteredOrders.length === 0 ? (
//                 <p>لا توجد طلبات مطابقة للبحث.</p>
//               ) : (
//                 <>
//                   <p
//                     style={{
//                       marginBottom: "0.5rem",
//                       color: "#fff",
//                       backgroundColor: "#001020be",
//                       width: 150,
//                       height: 50,
//                       textAlign: "center",
//                       padding: "10px 20px",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontWeight: "bold",
//                     }}
//                   >
//                    عدد الطلبات: {totalOrdersCount}

//                   </p>

//                   <table
//                     border="1"
//                     cellPadding="8"
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: "14px",
//                       textAlign: "center",
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     <thead
//                       style={{ backgroundColor: "#2c3e50ff", color: "white" }}
//                     >
//                       <tr>
//                         <th>رقم الطلب</th>
//                         <th>رقم العميل</th>
//                         <th>نوع الأسمنت</th>
//                         <th>الكمية (طن)</th>
//                         <th>تاريخ التحميل</th>
//                         <th>المبلغ الإجمالي</th>
//                         <th>الحالة</th>
//                         <th>الباركود</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map(
//                         (
//                           order // لاحظ: هنا ما نستخدم slicing لأننا جلبنا الصفحة جزئياً
//                         ) => (
//                           <tr key={order.order_id}>
//                             <td>{order.order_id}</td>
//                             <td>{order.customer_id}</td>
//                             <td>{order.cement_type}</td>
//                             <td>{order.quantity}</td>
//                             <td>
//                               {order.delivery_date
//                                 ? new Date(
//                                     order.delivery_date
//                                   ).toLocaleDateString()
//                                 : "-"}
//                             </td>
//                             <td>{order.total_cost}</td>
//                             <td
//                               style={{
//                                 fontWeight: "bold",
//                                 color: getStatusColor(order.status),
//                               }}
//                             >
//                               {order.status}
//                             </td>
//                             <td>
//                               <button
//                                 onClick={() =>
//                                   setSelectedOrderId((prev) =>
//                                     prev === order.order_id
//                                       ? null
//                                       : order.order_id
//                                   )
//                                 }
//                                 style={{
//                                   padding: "6px 12px",
//                                   fontSize: "13px",
//                                   backgroundColor: "#034b97e1",
//                                   color: "#fff",
//                                   border: "none",
//                                   borderRadius: "4px",
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 {selectedOrderId === order.order_id
//                                   ? "إخفاء"
//                                   : "عرض"}
//                               </button>
//                             </td>
//                           </tr>
//                         )
//                       )}
//                     </tbody>
//                   </table>

//                   {/* أزرار البيجينايشن */}
//                   <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <button
//                       onClick={() => {
//                         if (currentPage > 1) {
//                           const newPage = currentPage - 1;
//                           setCurrentPage(newPage);
//                           fetchOrders(newPage);
//                         }
//                       }}
//                       disabled={currentPage === 1}
//                       style={{
//                         padding: "8px 16px",
//                         margin: "0 5px",
//                         borderRadius: "6px",
//                         backgroundColor: currentPage === 1 ? "#ccc" : "#034b97",
//                         color: "#fff",
//                         border: "none",
//                         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       السابق
//                     </button>

//                     {[...Array(totalPages)].map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           const newPage = index + 1;
//                           setCurrentPage(newPage);
//                           fetchOrders(newPage);
//                         }}
//                         style={{
//                           padding: "8px 12px",
//                           margin: "0 3px",
//                           borderRadius: "6px",
//                           border: "1px solid #034b97",
//                           backgroundColor:
//                             currentPage === index + 1 ? "#034b97" : "#fff",
//                           color: currentPage === index + 1 ? "#fff" : "#034b97",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}

//                     <button
//                       onClick={() => {
//                         if (currentPage < totalPages) {
//                           const newPage = currentPage + 1;
//                           setCurrentPage(newPage);
//                           fetchOrders(newPage);
//                         }
//                       }}
//                       disabled={currentPage === totalPages}
//                       style={{
//                         padding: "8px 16px",
//                         margin: "0 5px",
//                         borderRadius: "6px",
//                         backgroundColor:
//                           currentPage === totalPages ? "#ccc" : "#034b97",
//                         color: "#fff",
//                         border: "none",
//                         cursor:
//                           currentPage === totalPages
//                             ? "not-allowed"
//                             : "pointer",
//                       }}
//                     >
//                       التالي
//                     </button>
//                   </div>

//                   {/* نافذة QR */}
//                   {selectedOrderId && selectedOrder && (
//                     <div
//                       onClick={() => setSelectedOrderId(null)}
//                       style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100vw",
//                         height: "100vh",
//                         backgroundColor: "rgba(0,0,0,0.3)",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         zIndex: 9999,
//                       }}
//                     >
//                       <div
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                           width: "350px",
//                           backgroundColor: "#fff",
//                           padding: "1.5rem",
//                           borderRadius: "12px",
//                           boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                           textAlign: "center",
//                           position: "relative",
//                         }}
//                       >
//                         <button
//                           onClick={() => setSelectedOrderId(null)}
//                           style={{
//                             position: "absolute",
//                             top: "8px",
//                             right: "12px",
//                             background: "transparent",
//                             border: "none",
//                             fontSize: "24px",
//                             fontWeight: "bold",
//                             cursor: "pointer",
//                             color: "#333",
//                           }}
//                         >
//                           &times;
//                         </button>
//                         <h3>رقم الطلب: {selectedOrder.order_id}</h3>
//                         <QRCodeCanvas
//                           id="qrCode"
//                           value={selectedOrder.order_id.toString()}
//                           size={200}
//                           level="H"
//                           includeMargin={true}
//                           ref={qrRef}
//                         />
//                         <div style={{ marginTop: "15px" }}>
//                           <button
//                             style={buttonStyle}
//                             onClick={handleDownloadPdf}
//                           >
//                             تحميل الباركود PDF
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



import React, { useEffect, useState, useRef, useCallback } from "react";
import API_BASE_URL from "../config.js";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import backgroundImage from "./images/Yamama-Cement-to.jpg";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const qrRef = useRef();
  const [customers, setCustomers] = useState([]);

  // إعداد البيجينايشن
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // عدد الطلبات في كل صفحة
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#034b97",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  };

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders(1);
    }
  }, [activeTab]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${API_BASE_URL}/orders?page=${page}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("فشل جلب الطلبات");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        const total = data.totalOrders || data.total || 0;
        setTotalPages(Math.ceil(total / itemsPerPage));
        setTotalOrdersCount(total);
      } else {
        setError("لم نستطع جلب الطلبات");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/customers`);
      if (!res.ok) throw new Error("فشل الاتصال بالخادم");
      const data = await res.json();
      let customerList = Array.isArray(data)
        ? data
        : data.customers || data.data || [];
      setCustomers(customerList);
      await fetchCustomerWallets(customerList);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomerWallets = async (customerList) => {
    const updated = await Promise.all(
      customerList.map(async (customer) => {
        try {
          const res = await fetch(
            `${API_BASE_URL}/wallet/${customer.customer_id}`
          );
          if (!res.ok) throw new Error("فشل جلب الرصيد");
          const data = await res.json();
          const balance = data.wallet?.TotalBalance || data.TotalBalance || 0;
          return { ...customer, wallet_balance: balance };
        } catch (err) {
          console.error(`خطأ في جلب رصيد العميل ${customer.customer_id}:`, err);
          return { ...customer, wallet_balance: 0 };
        }
      })
    );
    setCustomers(updated);
  };

  useEffect(() => {
    if (activeTab === "customers") {
      fetchCustomers();
    }
  }, [activeTab, fetchCustomers]);

  const handleDownloadPdf = () => {
    const input = qrRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("QRCode.pdf");
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "#007bff";
      case "in_progress":
        return "#fd7e14";
      case "done":
        return "#28a745";
      default:
        return "#dc3545";
    }
  };

const [filteredOrders, setFilteredOrders] = useState([]);

useEffect(() => {
  const searchOrders = async () => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/orders/search?query=${searchTerm}`);
      const data = await res.json();
      if (data.success) {
        setFilteredOrders(data.orders);
      }
    } catch (err) {
      console.error("خطأ في البحث:", err);
    }
  };

  const timeout = setTimeout(searchOrders, 600); // تأخير بسيط عشان ما يرسل كل ضغطة
  return () => clearTimeout(timeout);
}, [searchTerm, orders]);

  const selectedOrder = orders.find((o) => o.order_id === selectedOrderId);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "2rem",
        direction: "rtl",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.48)",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "1200px",
          margin: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "#2c3e50",
          }}
        >
          لوحة التحكم (الأدمن)
        </h2>

        {/* الأزرار */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setActiveTab("addBalance")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                activeTab === "addBalance" ? "#034b97" : "#001020be",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            إضافة رصيد للعميل
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                activeTab === "customers" ? "#034b97" : "#001020be",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            العملاء
          </button>

          <button
            onClick={() => setActiveTab("loginPortal")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                activeTab === "loginPortal" ? "#034b97" : "#001020be",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            بوابة الدخول والخروج
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            style={{
              padding: "8px 16px",
              backgroundColor: activeTab === "orders" ? "#034b97" : "#001020be",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            الطلبات
          </button>
        </div>

        {/* التبويبات */}
        <div>
          {/* تبويب إضافة رصيد */}
          {activeTab === "addBalance" && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => (window.location.href = "/admin/add-funds")}
                style={buttonStyle}
              >
                ➕ إضافة رصيد للعميل
              </button>
            </div>
          )}

          {/* تبويب العملاء */}
          {activeTab === "customers" && (
            <div style={{ marginTop: "30px", direction: "rtl" }}>
              <h3 style={{ textAlign: "center" }}>📋 قائمة العملاء</h3>

              <input
                type="text"
                placeholder="🔍 ابحث بالاسم أو البريد أو رقم الجوال..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "10px",
                  width: "80%",
                  margin: "20px auto",
                  display: "block",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />

              {loading ? (
                <p style={{ textAlign: "center" }}>
                  ⏳ جاري تحميل قائمة العملاء...
                </p>
              ) : error ? (
                <p style={{ textAlign: "center", color: "red" }}>{error}</p>
              ) : customers.length === 0 ? (
                <p style={{ textAlign: "center" }}>❌ لا يوجد عملاء حالياً.</p>
              ) : (
                <table
                  border="1"
                  cellPadding="8"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                    <tr>
                      <th>رقم العميل</th>
                      <th>الاسم</th>
                      <th>البريد الإلكتروني</th>
                      <th>رقم الجوال</th>
                      <th>الرصيد الحالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers
                      .filter((c) =>
                        [c.name, c.email, c.phone].some((field) =>
                          field
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((c) => (
                        <tr key={c.customer_id}>
                          <td>{c.customer_id}</td>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>
                            {c.wallet_balance !== undefined
                              ? `${c.wallet_balance} ريال`
                              : "جاري التحميل..."}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* تبويب البوابة */}
          {activeTab === "loginPortal" && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                style={buttonStyle}
                onClick={() => (window.location.href = "/gate")}
              >
                📥 دخول وخروج الشاحنات (البوابة)
              </button>
            </div>
          )}

          {/* تبويب الطلبات */}
          {activeTab === "orders" && (
            <div>
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="ابحث برقم الطلب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "250px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    textAlign: "center",
                  }}
                />
              </div>

              {loading ? (
                <p>جاري تحميل الطلبات...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : filteredOrders.length === 0 ? (
                <p>لا توجد طلبات مطابقة للبحث.</p>
              ) : (
                <>
                  <p
                    style={{
                      marginBottom: "0.5rem",
                      color: "#fff",
                      backgroundColor: "#001020be",
                      width: 150,
                      height: 50,
                      textAlign: "center",
                      padding: "10px 20px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    عدد الطلبات: {totalOrdersCount}
                  </p>

                  <table
                    border="1"
                    cellPadding="8"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <thead
                      style={{ backgroundColor: "#2c3e50ff", color: "white" }}
                    >
                      <tr>
                        <th>رقم الطلب</th>
                        <th>رقم العميل</th>
                        <th>نوع الأسمنت</th>
                        <th>الكمية (طن)</th>
                        <th>تاريخ التحميل</th>
                        <th>المبلغ الإجمالي</th>
                        <th>الحالة</th>
                        <th>الباركود</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.order_id}>
                          <td>{order.order_id}</td>
                          <td>{order.customer_id}</td>
                          <td>{order.cement_type}</td>
                          <td>{order.quantity}</td>
                          <td>
                            {order.delivery_date
                              ? new Date(
                                  order.delivery_date
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{order.total_cost}</td>
                          <td
                            style={{
                              fontWeight: "bold",
                              color: getStatusColor(order.status),
                            }}
                          >
                            {order.status}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                setSelectedOrderId((prev) =>
                                  prev === order.order_id
                                    ? null
                                    : order.order_id
                                )
                              }
                              style={{
                                padding: "6px 12px",
                                fontSize: "13px",
                                backgroundColor: "#034b97e1",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              {selectedOrderId === order.order_id
                                ? "إخفاء"
                                : "عرض"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* البيجينايشن */}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={() => {
                        if (currentPage > 1) {
                          const newPage = currentPage - 1;
                          setCurrentPage(newPage);
                          fetchOrders(newPage);
                        }
                      }}
                      disabled={currentPage === 1}
                      style={{
                        padding: "8px 16px",
                        margin: "0 5px",
                        borderRadius: "6px",
                        backgroundColor:
                          currentPage === 1 ? "#ccc" : "#034b97",
                        color: "#fff",
                        border: "none",
                        cursor:
                          currentPage === 1 ? "not-allowed" : "pointer",
                      }}
                    >
                      السابق
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newPage = index + 1;
                          setCurrentPage(newPage);
                          fetchOrders(newPage);
                        }}
                        style={{
                          padding: "8px 12px",
                          margin: "0 3px",
                          borderRadius: "6px",
                          border: "1px solid #034b97",
                          backgroundColor:
                            currentPage === index + 1 ? "#034b97" : "#fff",
                          color:
                            currentPage === index + 1 ? "#fff" : "#034b97",
                          cursor: "pointer",
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        if (currentPage < totalPages) {
                          const newPage = currentPage + 1;
                          setCurrentPage(newPage);
                          fetchOrders(newPage);
                        }
                      }}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: "8px 16px",
                        margin: "0 5px",
                        borderRadius: "6px",
                        backgroundColor:
                          currentPage === totalPages ? "#ccc" : "#034b97",
                        color: "#fff",
                        border: "none",
                        cursor:
                          currentPage === totalPages
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      التالي
                    </button>
                  </div>

                  {/* نافذة QR */}
                  {selectedOrderId && selectedOrder && (
                    <div
                      onClick={() => setSelectedOrderId(null)}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                      }}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          width: "350px",
                          backgroundColor: "#fff",
                          padding: "1.5rem",
                          borderRadius: "12px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => setSelectedOrderId(null)}
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "12px",
                            background: "transparent",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "#333",
                            lineHeight: "1",
                          }}
                          aria-label="إغلاق"
                        >
                          &times;
                        </button>

                        <h4 style={{ marginBottom: "1rem" }}>
                          باركود الطلب رقم {selectedOrderId}
                        </h4>

                        <div
                          ref={qrRef}
                          style={{
                            padding: "10px",
                            backgroundColor: "white",
                            display: "inline-block",
                          }}
                        >
                          <QRCodeCanvas
                            value={JSON.stringify(selectedOrder)}
                            size={270}
                          />
                        </div>

                        <div style={{ marginTop: "1rem" }}>
                          <button
                            onClick={handleDownloadPdf}
                            style={{
                              marginRight: "10px",
                              padding: "6px 14px",
                              backgroundColor: "#28a745",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "13px",
                            }}
                          >
                            تحميل PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

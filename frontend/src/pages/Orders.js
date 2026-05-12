// import React, { useEffect, useState, useRef } from "react";
// import API_BASE_URL from "../config";
// import { QRCodeCanvas } from "qrcode.react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 10;
//   const qrRef = useRef();
//   const [counts, setCounts] = useState({ new: 0, in_progress: 0, done: 0 });
//   const [totalOrders, setTotalOrders] = useState(0);

//   const fetchOrders = async (pageNum = 1, query = "") => {
//     const customerId = localStorage.getItem("customerId");
//     if (!customerId) {
//       setError("الرجاء تسجيل الدخول أولاً.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       let url = "";
//       if (query.trim() === "") {
//         // جلب الطلبات العادية مع Pagination
//         url = `${API_BASE_URL}/orders/customer/${customerId}?page=${pageNum}&limit=${pageSize}`;
//       } else {
//         // البحث في الطلبات
//         url = `${API_BASE_URL}/orders/search/customer/${customerId}?query=${query}`;
//       }

//       console.log("Fetching:", url); // للتأكد
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("فشل جلب الطلبات");

//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.orders);
//         if (!query) {
//           setTotalPages(data.totalPages || 1);
//           setCounts(data.counts || { new: 0, in_progress: 0, done: 0 });
//           setTotalOrders(data.totalOrders || 0);
//         }
//       } else {
//         setOrders([]);
//         setError("لم نستطع جلب الطلبات");
//       }
//     } catch (err) {
//       setError(err.message);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // جلب الطلبات عند تغير الصفحة أو البحث
//   useEffect(() => {
//     fetchOrders(page, searchTerm);
//   }, [page, searchTerm]);

//   // جلب تفاصيل طلب واحد عند الضغط على "عرض"
//   const handleSelectOrder = async (orderId) => {
//     if (selectedOrderId === orderId) {
//       setSelectedOrderId(null);
//       setSelectedOrder(null);
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
//       const data = await res.json();
//       if (data.success) {
//         setSelectedOrder(data.order);
//         setSelectedOrderId(orderId);
//         // إضافة الطلب للـ orders لو غير موجود
//         setOrders((prevOrders) => {
//           const exists = prevOrders.some((o) => o.order_id === orderId);
//           return exists ? prevOrders : [...prevOrders, data.order];
//         });
//       }
//     } catch (err) {
//       console.error("خطأ جلب الطلب:", err);
//     }
//   };

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
//       case "new": return "#007bff";
//       case "in_progress": return "#fd7e14";
//       case "done": return "#28a745";
//       default: return "#dc3545";
//     }
//   };

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
//           maxWidth: "1000px",
//           margin: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
//           سجل الطلبات
//         </h2>

//         <div style={{ marginBottom: "1rem", textAlign: "center" }}>
//           <input
//             type="text"
//             placeholder="ابحث برقم الطلب..."
//             value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} 
//             style={{
//               padding: "8px",
//               width: "250px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               textAlign: "center",
//             }}
//           />
//         </div>

//         {loading ? (
//           <p>جاري تحميل الطلبات...</p>
//         ) : error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : orders.length === 0 ? (
//           <p>لا توجد طلبات مطابقة للبحث.</p>
//         ) : (
//           <>
//             {/* باقي الجدول والـPagination + QR code كما عندك */}
//             {/* ... */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;


// import React, { useEffect, useState, useRef } from "react";
// import API_BASE_URL from "../config";
// import { QRCodeCanvas } from "qrcode.react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import backgroundImage from "./images/Yamama-Cement-to.jpg";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 10;
//   const qrRef = useRef();
//   const [counts, setCounts] = useState({ new: 0, in_progress: 0, done: 0 });
//   const [totalOrders, setTotalOrders] = useState(0);

//   const fetchOrders = async (pageNum = 1, query = "") => {
//     const customerId = localStorage.getItem("customerId");
//     if (!customerId) {
//       setError("الرجاء تسجيل الدخول أولاً.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       let url = "";
//       if (query.trim() === "") {
//         url = `${API_BASE_URL}/orders/customer/${customerId}?page=${pageNum}&limit=${pageSize}`;
//       } else {
//         url = `${API_BASE_URL}/orders/search/customer/${customerId}?query=${query}`;
//       }

//       console.log("Fetching:", url); 
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("فشل جلب الطلبات");

//       const data = await res.json();

//       if (data.success) {
//         setOrders(data.orders);
//         if (!query) {
//           setTotalPages(data.totalPages || 1);
//           setCounts(data.counts || { new: 0, in_progress: 0, done: 0 });
//           setTotalOrders(data.totalOrders || 0);
//         }
//       } else {
//         setOrders([]);
//         setError("لم نستطع جلب الطلبات");
//       }
//     } catch (err) {
//       setError(err.message);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders(page, searchTerm);
//   }, [page, searchTerm]);

//   const handleSelectOrder = async (orderId) => {
//     if (selectedOrderId === orderId) {
//       setSelectedOrderId(null);
//       setSelectedOrder(null);
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
//       const data = await res.json();
//       if (data.success) {
//         setSelectedOrder(data.order);
//         setSelectedOrderId(orderId);
//         setOrders((prevOrders) => {
//           const exists = prevOrders.some((o) => o.order_id === orderId);
//           return exists ? prevOrders : [...prevOrders, data.order];
//         });
//       }
//     } catch (err) {
//       console.error("خطأ جلب الطلب:", err);
//     }
//   };

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
//       case "new": return "#007bff";
//       case "in_progress": return "#fd7e14";
//       case "done": return "#28a745";
//       default: return "#dc3545";
//     }
//   };

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
//           maxWidth: "1000px",
//           margin: "auto",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           position: "relative",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
//           سجل الطلبات
//         </h2>

//         <div style={{ marginBottom: "1rem", textAlign: "center" }}>
//           <input
//             type="text"
//             placeholder="ابحث برقم الطلب..."
//             value={searchTerm}
//             onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} 
//             style={{
//               padding: "8px",
//               width: "250px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               textAlign: "center",
//             }}
//           />
//         </div>

//         {loading ? (
//           <p>جاري تحميل الطلبات...</p>
//         ) : error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : orders.length === 0 ? (
//           searchTerm.trim() === "" ? (
//             <p>لا توجد طلبات لديك.</p>
//           ) : (
//             <p>لا توجد طلبات مطابقة للبحث.</p>
//           )
//         ) : (
//           <>
//             {/* هنا الجدول أو بطاقات الطلبات */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Orders;

import React, { useEffect, useState, useRef } from "react";
import API_BASE_URL from "../config.js";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import backgroundImage from "./images/Yamama-Cement-to.jpg";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const qrRef = useRef();
  const [counts, setCounts] = useState({ new: 0, in_progress: 0, done: 0 });
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async (pageNum = 1, query = "") => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      setError("الرجاء تسجيل الدخول أولاً.");
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = "";
      if (query.trim() === "") {
        url = `${API_BASE_URL}/orders/customer/${customerId}?page=${pageNum}&limit=${pageSize}`;
      } else {
        url = `${API_BASE_URL}/orders/search/customer/${customerId}?query=${query}`;
      }

      console.log("Fetching:", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error("فشل جلب الطلبات");

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
        if (query.trim() === "") {
          setTotalPages(data.totalPages || 1);
          setCounts(data.counts || { new: 0, in_progress: 0, done: 0 });
          setTotalOrders(data.totalOrders || 0);
        }
      } else {
        setOrders([]);
        setError("لم نستطع جلب الطلبات");
      }
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page, searchTerm);
  }, [page, searchTerm]);

  const handleSelectOrder = async (orderId) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
      setSelectedOrder(null);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setSelectedOrderId(orderId);
        setOrders((prevOrders) => {
          const exists = prevOrders.some((o) => o.order_id === orderId);
          return exists ? prevOrders : [...prevOrders, data.order];
        });
      }
    } catch (err) {
      console.error("خطأ جلب الطلب:", err);
    }
  };

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
      case "new": return "#007bff";
      case "in_progress": return "#fd7e14";
      case "done": return "#28a745";
      default: return "#dc3545";
    }
  };

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
          maxWidth: "1000px",
          margin: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}>
          سجل الطلبات
        </h2>

        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="ابحث برقم الطلب..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
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
        ) : orders.length === 0 ? (
          searchTerm.trim() === "" ? (
            <p>لا توجد طلبات لديك.</p>
          ) : (
            <p>لا توجد طلبات مطابقة للبحث.</p>
          )
        ) : (
          <>
            {/* هنا يمكنك إضافة الجدول أو بطاقات الطلبات */}
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;
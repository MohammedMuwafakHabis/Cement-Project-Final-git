// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { QRCodeCanvas } from 'qrcode.react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import API_BASE_URL from '../config';

// function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderData } = location.state || {};
//   const [paid, setPaid] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const qrRef = useRef();

//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!orderData || !customerId) {
//       alert('لا توجد بيانات كافية. الرجاء إعادة الطلب.');
//       navigate('/new-order');
//       return;
//     }

//     const fetchBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch (error) {
//         setWalletBalance(0);
//       }
//     };

//     fetchBalance();
//   }, [orderData, customerId, navigate]);

//   const qrData = {
//     ...orderData,
//     paymentStatus: paid ? 'تم الدفع' : 'لم يتم الدفع',
//     amountPaid: paid ? orderData.totalCost : 0,
//     paymentMethod: paid ? 'محفظة' : null,
//   };

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
//         pdf.save('QRCode.pdf');
//       })
//       .catch((err) => {
//         console.error('Error generating PDF:', err);
//       });
//   };

//   const handlePayment = async () => {
//     if (walletBalance < orderData.totalCost) {
//       alert('رصيدك غير كافي لإتمام العملية.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/charge`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: orderData.totalCost,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPaid(true);
//         setWalletBalance((prev) => prev - orderData.totalCost);
//       } else {
//         alert(data.message || 'تعذر إتمام العملية.');
//       }
//     } catch (error) {
//       alert('حدث خطأ أثناء الدفع. الرجاء المحاولة لاحقًا.');
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
//       <h2>الدفع</h2>

//       {!paid && (
//         <>
//           <p>رصيدك الحالي: <strong>{walletBalance.toLocaleString()} ريال</strong></p>
//           <p>قيمة الطلب: <strong>{orderData.totalCost.toLocaleString()} ريال</strong></p>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: loading ? 'not-allowed' : 'pointer',
//             }}
//           >
//             {loading ? 'جاري الدفع...' : 'تأكيد الدفع'}
//           </button>
//         </>
//       )}

//       {paid && (
//         <>
//           <h3 style={{ marginTop: '20px', color: 'green' }}>تم الدفع بنجاح!</h3>

//           <div
//             ref={qrRef}
//             style={{
//               display: 'inline-block',
//               padding: 10,
//               background: 'white',
//               marginBottom: 10,
//               marginTop: 20,
//             }}
//           >
//             <QRCodeCanvas value={JSON.stringify(qrData)} size={256} />
//           </div>

//           <br />

//           <button
//             onClick={handleDownloadPdf}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             تحميل كـ PDF
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Payment;



// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { QRCodeCanvas } from 'qrcode.react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import API_BASE_URL from '../config';

// function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderData } = location.state || {};
//   const [paid, setPaid] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const qrRef = useRef();

//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!orderData || !customerId) {
//       alert('لا توجد بيانات كافية. الرجاء إعادة الطلب.');
//       navigate('/new-order');
//       return;
//     }

//     const fetchBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch (error) {
//         setWalletBalance(0);
//       }
//     };

//     fetchBalance();
//   }, [orderData, customerId, navigate]);

//   const qrData = {
//     ...orderData,
//     paymentStatus: paid ? 'تم الدفع' : 'لم يتم الدفع',
//     amountPaid: paid ? orderData.totalCost : 0,
//     paymentMethod: paid ? 'محفظة' : null,
//   };

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
//         pdf.save('QRCode.pdf');
//       })
//       .catch((err) => {
//         console.error('Error generating PDF:', err);
//       });
//   };

//   const handlePayment = async () => {
//     if (walletBalance < orderData.totalCost) {
//       alert('رصيدك غير كافي لإتمام العملية.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/charge`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: orderData.totalCost,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPaid(true);
//         setWalletBalance((prev) => prev - orderData.totalCost);
//       } else {
//         alert(data.message || 'تعذر إتمام العملية.');
//       }
//     } catch (error) {
//       alert('حدث خطأ أثناء الدفع. الرجاء المحاولة لاحقًا.');
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: 400, margin: 'auto', textAlign: 'center', }}>
//       <h2>الدفع</h2>

//       {!paid && (
//         <>
//           <p>رصيدك الحالي: <strong>{walletBalance.toLocaleString()} ريال</strong></p>
//           <p>قيمة الطلب: <strong>{orderData.totalCost.toLocaleString()} ريال</strong></p>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: loading ? 'not-allowed' : 'pointer',
//             }}
//           >
//             {loading ? 'جاري الدفع...' : 'تأكيد الدفع'}
//           </button>
//         </>
//       )}

//       {paid && (
//         <>
//           <h3 style={{ marginTop: '20px', color: 'green' }}>تم الدفع بنجاح!</h3>

//           <div
//             ref={qrRef}
//             style={{
//               display: 'inline-block',
//               padding: 10,
//               background: 'white',
//               marginBottom: 10,
//               marginTop: 20,
//             }}
//           >
//             <QRCodeCanvas value={JSON.stringify(qrData)} size={256} />
//           </div>

//           <br />

//           <button
//             onClick={handleDownloadPdf}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               marginBottom: '10px',
//             }}
//           >
//             تحميل كـ PDF
//           </button>

//           <br />

//           <button
//             onClick={() => navigate('/dashboard')}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#054074ff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             العودة إلى لوحة التحكم
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Payment;



// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { QRCodeCanvas } from 'qrcode.react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import API_BASE_URL from '../config';

// function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderData } = location.state || {};
//   const [paid, setPaid] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const qrRef = useRef();

//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!orderData || !customerId) {
//       alert('لا توجد بيانات كافية. الرجاء إعادة الطلب.');
//       navigate('/new-order');
//       return;
//     }

//     if (!orderData.order_id && !orderData.orderId) {
//       alert('رقم الطلب مفقود! الرجاء العودة للصفحة السابقة.');
//       navigate('/new-order');
//       return;
//     }

//     const fetchBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch (error) {
//         setWalletBalance(0);
//       }
//     };

//     fetchBalance();
//   }, [orderData, customerId, navigate]);

//   // نستخدم order_id أو orderId حسب التسمية في بياناتك
//   const orderId = orderData.order_id || orderData.orderId || 'غير معرف';

//   const qrData = {
//     ...orderData,
//     order_id: orderId,  // تأكد من وجود رقم الطلب هنا
//     paymentStatus: paid ? 'تم الدفع' : 'لم يتم الدفع',
//     amountPaid: paid ? orderData.totalCost : 0,
//     paymentMethod: paid ? 'محفظة' : null,
//   };

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
//         pdf.save('QRCode.pdf');
//       })
//       .catch((err) => {
//         console.error('Error generating PDF:', err);
//       });
//   };

//   const handlePayment = async () => {
//     if (walletBalance < orderData.totalCost) {
//       alert('رصيدك غير كافي لإتمام العملية.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/charge`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: orderData.totalCost,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPaid(true);
//         setWalletBalance((prev) => prev - orderData.totalCost);
//       } else {
//         alert(data.message || 'تعذر إتمام العملية.');
//       }
//     } catch (error) {
//       alert('حدث خطأ أثناء الدفع. الرجاء المحاولة لاحقًا.');
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
//       <h2>الدفع</h2>

//       {!paid && (
//         <>
//           <p>رصيدك الحالي: <strong>{walletBalance.toLocaleString()} ريال</strong></p>
//           <p>قيمة الطلب: <strong>{orderData.totalCost.toLocaleString()} ريال</strong></p>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: loading ? 'not-allowed' : 'pointer',
//             }}
//           >
//             {loading ? 'جاري الدفع...' : 'تأكيد الدفع'}
//           </button>
//         </>
//       )}

//       {paid && (
//         <>
//           <h3 style={{ marginTop: '20px', color: 'green' }}>تم الدفع بنجاح!</h3>

//           <div
//             ref={qrRef}
//             style={{
//               display: 'inline-block',
//               padding: 10,
//               background: 'white',
//               marginBottom: 10,
//               marginTop: 20,
//               wordBreak: 'break-word'
//             }}
//           >
//             <QRCodeCanvas value={JSON.stringify(qrData)} size={256} />
//           </div>

//           <p><strong>رقم الطلب:</strong> {orderId}</p>

//           <br />

//           <button
//             onClick={handleDownloadPdf}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               marginBottom: '10px',
//             }}
//           >
//             تحميل كـ PDF
//           </button>

//           <br />

//           <button
//             onClick={() => navigate('/dashboard')}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: '#054074ff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             العودة إلى لوحة التحكم
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Payment;









// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { QRCodeCanvas } from 'qrcode.react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import API_BASE_URL from '../config';
// import bgImage from './images/cementera-Payment-page.jpg';


// function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { orderData } = location.state || {};
//   const [paid, setPaid] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const qrRef = useRef();
  

//   const customerId = localStorage.getItem('customerId');

//   useEffect(() => {
//     if (!orderData || !customerId) {
//       alert('لا توجد بيانات كافية. الرجاء إعادة الطلب.');
//       navigate('/new-order');
//       return;
//     }

//     if (!orderData.order_id && !orderData.orderId) {
//       alert('رقم الطلب مفقود! الرجاء العودة للصفحة السابقة.');
//       navigate('/new-order');
//       return;
//     }

//     const fetchBalance = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
//         const data = await res.json();
//         setWalletBalance(data.TotalBalance || 0);
//       } catch (error) {
//         setWalletBalance(0);
//       }
//     };

//     fetchBalance();
//   }, [orderData, customerId, navigate]);

//   const orderId = orderData.order_id || orderData.orderId || 'غير معرف';

//   const qrData = {
//     ...orderData,
//     order_id: orderId,
//     paymentStatus: paid ? 'تم الدفع' : 'لم يتم الدفع',
//     amountPaid: paid ? orderData.totalCost : 0,
//     paymentMethod: paid ? 'محفظة' : null,
//   };

//   const handleDownloadPdf = () => {
//     const input = qrRef.current;
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
//         pdf.save('QRCode.pdf');
//       })
//       .catch((err) => {
//         console.error('Error generating PDF:', err);
//       });
//   };

//   const handlePayment = async () => {
//     if (walletBalance < orderData.totalCost) {
//       alert('رصيدك غير كافي لإتمام العملية.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/charge`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: orderData.totalCost,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPaid(true);
//         setWalletBalance((prev) => prev - orderData.totalCost);
//       } else {
//         alert(data.message || 'تعذر إتمام العملية.');
//       }
//     } catch (error) {
//       alert('حدث خطأ أثناء الدفع. الرجاء المحاولة لاحقًا.');
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//  <div style={{
//   backgroundImage: `url(${bgImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '20px',
// }}>

//       <div style={{
//         backgroundColor: '#ffffffa9',
//         borderRadius: '12px',
//         boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
//         padding: '30px',
//         width: '100%',
//         maxWidth: '500px',
//         textAlign: 'center',
//         direction: 'rtl'
//       }}>
//         <h2 style={{ color: '#000000ff', marginBottom: '20px' }}>الدفع</h2>

//         {!paid ? (
//           <>
//             <div style={{
//               backgroundColor: '#ffffffff',
//               padding: '15px',
//               borderRadius: '8px',
//               marginBottom: '20px',
//               fontSize: '15px'
//             }}>
//               <p>رصيدك الحالي: <strong>{walletBalance.toLocaleString()} ريال</strong></p>
//               <p>قيمة الطلب: <strong>{orderData.totalCost.toLocaleString()} ريال</strong></p>
//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={loading}
//               style={{
//                 padding: '12px 20px',
//                 backgroundColor: '#06048bff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '6px',
//                 fontSize: '16px',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 width: '100%',
                
//               }}
//             >
//               {loading ? 'جاري الدفع...' : 'تأكيد الدفع'}
//             </button>


//           </>
//         ) : (
//           <>
//             <h3 style={{ marginTop: '20px', color: '#27ae60' }}>تم الدفع بنجاح!</h3>

//             <div
//               ref={qrRef}
//               style={{
//                 display: 'inline-block',
//                 padding: 10,
//                 background: '#fff',
//                 marginBottom: 10,
//                 marginTop: 20,
//                 wordBreak: 'break-word',
//                 border: '1px solid #ddd',
//                 borderRadius: '8px'
//               }}
//             >
//               <QRCodeCanvas value={JSON.stringify(qrData)} size={256} />
//             </div>

//             <p style={{ marginTop: '10px', fontSize: '20px' }}>
//               <strong>رقم الطلب:</strong> <strong>{orderId}</strong> 
//             </p>

//             <button
//               onClick={handleDownloadPdf}
//               style={{
//                 padding: '12px 20px',
//                 backgroundColor: '#28a745',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '6px',
//                 fontSize: '15px',
//                 cursor: 'pointer',
//                 width: '100%',
//                 marginTop: '15px'
//               }}
//             >
//               تحميل كـ PDF
//             </button>

//             <button
//               onClick={() => navigate('/dashboard')}
//               style={{
//                 padding: '12px 20px',
//                 backgroundColor: '#054074',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '6px',
//                 fontSize: '15px',
//                 cursor: 'pointer',
//                 width: '100%',
//                 marginTop: '10px'
//               }}
//             >
//               العودة إلى لوحة التحكم
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Payment;



import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import API_BASE_URL from '../config.js';
import bgImage from './images/cementera-Payment-page.jpg';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};
  const [paid, setPaid] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef();

  // لإدارة تأثير hover
  const [hoveredButton, setHoveredButton] = useState(null);

  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    if (!orderData || !customerId) {
      alert('لا توجد بيانات كافية. الرجاء إعادة الطلب.');
      navigate('/new-order');
      return;
    }

    if (!orderData.order_id && !orderData.orderId) {
      alert('رقم الطلب مفقود! الرجاء العودة للصفحة السابقة.');
      navigate('/new-order');
      return;
    }

    const fetchBalance = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/wallet/${customerId}`);
        const data = await res.json();
        setWalletBalance(data.TotalBalance || 0);
      } catch (error) {
        setWalletBalance(0);
      }
    };

    fetchBalance();
  }, [orderData, customerId, navigate]);

  const orderId = orderData.order_id || orderData.orderId || 'غير معرف';

  const qrData = {
    ...orderData,
    order_id: orderId,
    paymentStatus: paid ? 'تم الدفع' : 'لم يتم الدفع',
    amountPaid: paid ? orderData.totalCost : 0,
    paymentMethod: paid ? 'محفظة' : null,
  };

  const handleDownloadPdf = () => {
    const input = qrRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save('QRCode.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
      });
  };

  const handlePayment = async () => {
    if (walletBalance < orderData.totalCost) {
      alert('رصيدك غير كافي لإتمام العملية.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/wallet/${customerId}/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderData.totalCost,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPaid(true);
        setWalletBalance((prev) => prev - orderData.totalCost);
      } else {
        alert(data.message || 'تعذر إتمام العملية.');
      }
    } catch (error) {
      alert('حدث خطأ أثناء الدفع. الرجاء المحاولة لاحقًا.');
      console.error(error);
    }

    setLoading(false);
  };

  // وظيفة لتغيير لون الزر عند hover
  const getButtonStyle = (baseColor, hoverColor, buttonKey) => ({
    padding: '12px 20px',
    backgroundColor: hoveredButton === buttonKey ? hoverColor : baseColor,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: loading && buttonKey === 'pay' ? 'not-allowed' : 'pointer',
    width: '100%',
    marginTop: '10px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    transform: hoveredButton === buttonKey ? 'scale(1.03)' : 'scale(1)',
  });

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffffa9',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          padding: '30px',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
          direction: 'rtl',
        }}
      >
        <h2 style={{ color: '#000000ff', marginBottom: '20px' }}>الدفع</h2>

        {!paid ? (
          <>
            <div
              style={{
                backgroundColor: '#ffffffff',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '15px',
              }}
            >
              <p>
                رصيدك الحالي:{' '}
                <strong>{walletBalance.toLocaleString()} ريال</strong>
              </p>
              <p>
                قيمة الطلب:{' '}
                <strong>{orderData.totalCost.toLocaleString()} ريال</strong>
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              style={getButtonStyle('#06048b', '#0706a0', 'pay')}
              onMouseEnter={() => setHoveredButton('pay')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {loading ? 'جاري الدفع...' : 'تأكيد الدفع'}
            </button>
          </>
        ) : (
          <>
            <h3 style={{ marginTop: '20px', color: '#27ae60' }}>
              تم الدفع بنجاح!
            </h3>

            <div
              ref={qrRef}
              style={{
                display: 'inline-block',
                padding: 10,
                background: '#fff',
                marginBottom: 10,
                marginTop: 20,
                wordBreak: 'break-word',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <QRCodeCanvas value={JSON.stringify(qrData)} size={256} />
            </div>

            <p style={{ marginTop: '10px', fontSize: '20px' }}>
              <strong>رقم الطلب:</strong> <strong>{orderId}</strong>
            </p>

            <button
              onClick={handleDownloadPdf}
              style={getButtonStyle('#28a745', '#218838', 'pdf')}
              onMouseEnter={() => setHoveredButton('pdf')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              تحميل كـ PDF
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              style={getButtonStyle('#054074', '#075a9d', 'back')}
              onMouseEnter={() => setHoveredButton('back')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              العودة إلى لوحة التحكم
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;

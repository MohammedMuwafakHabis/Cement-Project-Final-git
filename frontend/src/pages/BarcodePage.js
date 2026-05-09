// src/pages/BarcodePage.js
import { useLocation } from 'react-router-dom';
import Barcode from 'react-barcode';

function BarcodePage() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) return <p>لا توجد بيانات طلب</p>;

  const barcodeValue = JSON.stringify(orderData);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>باركود الطلبية</h2>
      <Barcode value={barcodeValue} />
      <p>اعرض هذا الباركود عند البوابة</p>
    </div>
  );
}

export default BarcodePage;

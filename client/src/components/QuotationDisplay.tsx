export default function QuotationDisplay({ data }) {
  return (
    <div>
      <h2>Quotation Summary</h2>
      <p>Nights: {data.nights}</p>
      <p>Room Charges: ₹{data.totalRoom}</p>
      <p>{data.gstLabel}: ₹{data.gstAmount}</p>
      <p><b>Final Amount: ₹{data.finalAmount}</b></p>
    </div>
  );
}
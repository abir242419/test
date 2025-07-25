import { useState } from "react";

export default function BookingForm({ onCalculate }) {
  const [form, setForm] = useState({
    guestName: "",
    villaName: "",
    checkInDate: "",
    checkOutDate: "",
    nightlyRates: "",
    totalPax: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rates = form.nightlyRates.split(",").map(Number);
    const res = await fetch("/api/quotations/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, nightlyRates: rates })
    });
    onCalculate(await res.json());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Guest Name" onChange={e => setForm({...form, guestName: e.target.value})}/>
      <input placeholder="Villa Name" onChange={e => setForm({...form, villaName: e.target.value})}/>
      <input type="date" onChange={e => setForm({...form, checkInDate: e.target.value})}/>
      <input type="date" onChange={e => setForm({...form, checkOutDate: e.target.value})}/>
      <input placeholder="Nightly Rates (comma separated)" onChange={e => setForm({...form, nightlyRates: e.target.value})}/>
      <input type="number" placeholder="Total Guests" onChange={e => setForm({...form, totalPax: +e.target.value})}/>
      <button>Calculate</button>
    </form>
  );
}
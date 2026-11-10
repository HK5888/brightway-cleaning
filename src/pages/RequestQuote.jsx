import { useState } from "react";
import { QuoteRequest } from "../api/client";

export default function RequestQuote() {
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", address: "", property_type: "house", size_sqft: 1200, frequency: "once" });
  const [sent, setSent] = useState(false);
  const submit = async (e) => { e.preventDefault(); await QuoteRequest.create({ ...form, status: "new" }); setSent(true); };
  if (sent) return <p className="text-xl">Thanks! We'll email your quote within one business day.</p>;
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-6 max-w-lg space-y-3">
      <h1 className="text-2xl font-bold">Get a cleaning quote</h1>
      {["customer_name", "email", "phone", "address"].map((k) => (
        <input key={k} className="w-full border rounded p-2" placeholder={k.replace("_", " ")} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      ))}
      <select className="w-full border rounded p-2" value={form.property_type} onChange={(e) => setForm({ ...form, property_type: e.target.value })}>
        <option value="apartment">Apartment</option><option value="house">House</option><option value="office">Office</option>
      </select>
      <input type="number" className="w-full border rounded p-2" value={form.size_sqft} onChange={(e) => setForm({ ...form, size_sqft: Number(e.target.value) })} />
      <select className="w-full border rounded p-2" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}>
        <option value="once">One time</option><option value="weekly">Weekly</option><option value="biweekly">Every two weeks</option><option value="monthly">Monthly</option>
      </select>
      <button className="w-full bg-sky-600 text-white rounded p-2">Request quote</button>
    </form>
  );
}

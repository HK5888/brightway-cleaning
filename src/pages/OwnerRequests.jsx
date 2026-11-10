import { useEffect, useState } from "react";
import { QuoteRequest, Quote, functions } from "../api/client";
import { suggestPrice } from "../components/pricing";

export default function OwnerRequests() {
  const [rows, setRows] = useState([]);
  const [prices, setPrices] = useState({});
  const load = async () => setRows(await QuoteRequest.filter({ status: "new" }, "-created_date"));
  useEffect(() => { load(); }, []);

  const sendQuote = async (r) => {
    const price = prices[r.id] ?? suggestPrice(r);
    const quote = await Quote.create({ request_id: r.id, price, status: "sent" });
    await QuoteRequest.update(r.id, { status: "quoted" });
    await functions.invoke("sendQuoteEmail", { quote_id: quote.id });
    load();
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">New quote requests</h2>
      {rows.map((r) => (
        <div key={r.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold">{r.customer_name} · {r.property_type}, {r.size_sqft} sq ft · {r.frequency}</p>
            <p className="text-sm text-slate-500">{r.address}</p>
          </div>
          <input type="number" className="border rounded p-1 w-24" placeholder={suggestPrice(r)} onChange={(e) => setPrices({ ...prices, [r.id]: Number(e.target.value) })} />
          <button onClick={() => sendQuote(r)} className="bg-sky-600 text-white rounded px-3 py-1">Send quote</button>
        </div>
      ))}
    </div>
  );
}

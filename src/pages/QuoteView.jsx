import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Quote, QuoteRequest, Job } from "../api/client";

export default function QuoteView() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [req, setReq] = useState(null);
  useEffect(() => { (async () => { const q = await Quote.get(id); setQuote(q); setReq(await QuoteRequest.get(q.request_id)); })(); }, [id]);

  const accept = async () => {
    await Quote.update(id, { status: "accepted", accepted_at: new Date().toISOString() });
    // weekly discount applied again on the job price
    const price = req.frequency === "weekly" ? Math.round(quote.price * 0.85) : quote.price;
    await Job.create({ quote_id: id, address: req.address, status: "scheduled", price });
    setQuote({ ...quote, status: "accepted" });
  };

  if (!quote || !req) return <p>Loading…</p>;
  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-md space-y-3">
      <h2 className="text-2xl font-bold">Your quote</h2>
      <p>{req.property_type}, {req.size_sqft} sq ft, {req.frequency}</p>
      <p className="text-4xl font-bold">${quote.price}</p>
      {quote.status === "sent" ? <button onClick={accept} className="w-full bg-sky-600 text-white rounded p-2">Accept quote</button> : <p className="text-green-700">Accepted. We'll be in touch to book your date.</p>}
    </div>
  );
}

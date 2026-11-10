import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Quote } from "../api/client";

export default function OwnerRevenue() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      // revenue = accepted quotes, by month accepted
      const accepted = await Quote.filter({ status: "accepted" });
      const byMonth = {};
      accepted.forEach((q) => { const m = format(new Date(q.accepted_at), "MMM yyyy"); byMonth[m] = (byMonth[m] ?? 0) + q.price; });
      setData(Object.entries(byMonth).map(([month, total]) => ({ month, total })));
    })();
  }, []);
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Revenue by month</h2>
      <BarChart width={700} height={300} data={data}><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="total" fill="#0284c7" /></BarChart>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Job, Cleaner } from "../api/client";

export default function OwnerJobs() {
  const [jobs, setJobs] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const load = async () => { setJobs(await Job.list("-created_date")); setCleaners(await Cleaner.filter({ active: true })); };
  useEffect(() => { load(); }, []);
  const assign = async (job, patch) => { await Job.update(job.id, patch); load(); };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Jobs</h2>
      {jobs.map((j) => (
        <div key={j.id} className="bg-white rounded-xl shadow p-4 flex gap-3 items-center">
          <span className="flex-1">{j.address} · ${j.price} · {j.status}</span>
          <input type="date" defaultValue={j.date} className="border rounded p-1" onBlur={(e) => assign(j, { date: e.target.value })} />
          <select defaultValue={j.cleaner_email ?? ""} className="border rounded p-1" onChange={(e) => assign(j, { cleaner_email: e.target.value })}>
            <option value="">Assign cleaner</option>
            {cleaners.map((c) => <option key={c.id} value={c.email}>{c.full_name}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

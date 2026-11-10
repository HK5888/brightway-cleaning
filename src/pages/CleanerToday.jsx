import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Job } from "../api/client";

export default function CleanerToday() {
  const [jobs, setJobs] = useState([]);
  const [notes, setNotes] = useState({});
  const today = format(new Date(), "yyyy-MM-dd");
  const load = async () => setJobs(await Job.filter({ date: today }));
  useEffect(() => { load(); }, []);
  const complete = async (j) => { await Job.update(j.id, { status: "complete", completion_note: notes[j.id] ?? "" }); load(); };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Today's jobs</h2>
      {jobs.map((j) => (
        <div key={j.id} className="bg-white rounded-xl shadow p-4 space-y-2">
          <p className="font-semibold">{j.address}</p>
          <p className="text-sm text-slate-500">Assigned to {j.cleaner_email ?? "nobody yet"}</p>
          {j.status === "scheduled" ? (
            <div className="flex gap-2">
              <input className="flex-1 border rounded p-1" placeholder="Note for the owner" onChange={(e) => setNotes({ ...notes, [j.id]: e.target.value })} />
              <button onClick={() => complete(j)} className="bg-sky-600 text-white rounded px-3">Mark complete</button>
            </div>
          ) : <p className="text-green-700">Done. {j.completion_note}</p>}
        </div>
      ))}
    </div>
  );
}

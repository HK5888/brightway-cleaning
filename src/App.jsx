import { Routes, Route, Link } from "react-router-dom";
import RequestQuote from "./pages/RequestQuote";
import QuoteView from "./pages/QuoteView";
import OwnerRequests from "./pages/OwnerRequests";
import OwnerJobs from "./pages/OwnerJobs";
import OwnerRevenue from "./pages/OwnerRevenue";
import CleanerToday from "./pages/CleanerToday";

export default function App() {
  return (
    <div className="min-h-screen bg-sky-50">
      <nav className="bg-white shadow px-6 py-3 flex gap-6">
        <Link to="/" className="font-bold text-sky-700">Brightway Cleaning</Link>
        <Link to="/owner/requests">Requests</Link>
        <Link to="/owner/jobs">Jobs</Link>
        <Link to="/owner/revenue">Revenue</Link>
        <Link to="/cleaner">My day</Link>
      </nav>
      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<RequestQuote />} />
          <Route path="/quote/:id" element={<QuoteView />} />
          <Route path="/owner/requests" element={<OwnerRequests />} />
          <Route path="/owner/jobs" element={<OwnerJobs />} />
          <Route path="/owner/revenue" element={<OwnerRevenue />} />
          <Route path="/cleaner" element={<CleanerToday />} />
        </Routes>
      </main>
    </div>
  );
}

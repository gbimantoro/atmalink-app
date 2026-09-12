import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  company?: { name: string; logo_url?: string };
  location?: string;
  salary_min?: number;
  salary_max?: number;
  posted_at: string;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
          {job.company?.logo_url ? (
            <img src={job.company.logo_url} alt={job.company.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">💼</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-500 truncate">{job.company?.name}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {job.location && <span className="flex items-center gap-1">📍 {job.location}</span>}
            {job.salary_min && job.salary_max && (
              <span className="flex items-center gap-1">💰 Rp{job.salary_min.toLocaleString()} - Rp{job.salary_max.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
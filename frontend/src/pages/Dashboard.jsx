import { useEffect, useMemo, useState } from "react";
import programsApi from "../api/programsApi.js";
import appsApi from "../api/applicationsApi.js";
import usersApi from "../api/usersApi.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [programs, setPrograms] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [progs, apps, usrs] = await Promise.all([
          programsApi.getPrograms().catch(() => []),
          appsApi
            .getApplications()
            .then((d) => (Array.isArray(d) ? d : d?.applications || []))
            .catch(() => []),
          usersApi.getUsers().catch(() => []),
        ]);
        if (!mounted) return;
        setPrograms(Array.isArray(progs) ? progs : []);
        setApplications(Array.isArray(apps) ? apps : []);
        setUsers(Array.isArray(usrs) ? usrs : []);
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to load dashboard data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const appStatusSummary = useMemo(() => {
    const summary = { submitted: 0, approved: 0, rejected: 0 };
    for (const a of applications) {
      const s = String(a.status || "submitted").toLowerCase();
      if (summary[s] === undefined) summary[s] = 0;
      summary[s]++;
    }
    return summary;
  }, [applications]);

  const appsByProgram = useMemo(() => {
    const map = new Map();
    for (const a of applications) {
      const name = a.program?.name || "Unknown";
      map.set(name, (map.get(name) || 0) + 1);
    }
    const arr = Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
    arr.sort((a, b) => b.count - a.count);
    return arr.slice(0, 5);
  }, [applications]);

  const recentApps = useMemo(() => {
    const clone = [...applications];
    clone.sort(
      (a, b) => new Date(b.applied_at || 0) - new Date(a.applied_at || 0)
    );
    return clone.slice(0, 5);
  }, [applications]);

  const totalPrograms = programs.length;
  const totalApps = applications.length;
  const totalUsers = users.length;

  const maxProgramCount = Math.max(1, ...appsByProgram.map((x) => x.count));
  const totalStatuses =
    Object.values(appStatusSummary).reduce((s, v) => s + (v || 0), 0) || 1;

  return (
    <section className="py-3">
      <div className="container-fluid px-2">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h4 m-0 text-success">Dashboard</h1>
          {loading && <span className="text-muted small">Loading data…</span>}
        </div>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {/* Stats cards */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Programs</div>
                    <div className="fs-3 fw-semibold">{totalPrograms}</div>
                  </div>
                  <i className="bi bi-journals fs-2 text-success"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Applications</div>
                    <div className="fs-3 fw-semibold">{totalApps}</div>
                  </div>
                  <i className="bi bi-inboxes fs-2 text-primary"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-muted small">Users</div>
                    <div className="fs-3 fw-semibold">{totalUsers}</div>
                  </div>
                  <i className="bi bi-people fs-2 text-warning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="fw-semibold">Applications by Status</div>
                <div className="text-muted small">
                  Distribution of current applications
                </div>
              </div>
              <div className="card-body">
                {Object.entries(appStatusSummary).map(([status, count]) => {
                  const percent = Math.round((count / totalStatuses) * 100);
                  const label =
                    status.charAt(0).toUpperCase() + status.slice(1);
                  const barClass =
                    status === "approved"
                      ? "bg-success"
                      : status === "rejected"
                      ? "bg-danger"
                      : "bg-secondary";
                  return (
                    <div className="mb-3" key={status}>
                      <div className="d-flex justify-content-between small mb-1">
                        <span>{label}</span>
                        <span className="text-muted">{count}</span>
                      </div>
                      <div
                        className="progress"
                        role="progressbar"
                        aria-label={`${label} percent`}
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className={`progress-bar ${barClass}`}
                          style={{ width: `${percent}%` }}
                        >
                          {percent}%
                        </div>
                      </div>
                    </div>
                  );
                })}
                {totalApps === 0 && (
                  <div className="text-muted small">No applications yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4 h-100">
              <div className="card-header bg-white border-0">
                <div className="fw-semibold">Top Programs by Applications</div>
                <div className="text-muted small">Top 5 programs</div>
              </div>
              <div className="card-body">
                {appsByProgram.length === 0 ? (
                  <div className="text-muted small">No data to display.</div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {appsByProgram.map((p) => {
                      const w = Math.round((p.count / maxProgramCount) * 100);
                      return (
                        <div key={p.name}>
                          <div className="d-flex justify-content-between small mb-1">
                            <div
                              className="text-truncate"
                              style={{ maxWidth: 220 }}
                            >
                              {p.name}
                            </div>
                            <span className="text-muted">{p.count}</span>
                          </div>
                          <div
                            className="progress"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={w}
                          >
                            <div
                              className="progress-bar bg-info"
                              style={{ width: `${w}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="row g-3 mt-3">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-header bg-white border-0">
                <div className="fw-semibold">Recent Applications</div>
                <div className="text-muted small">Latest 5 submissions</div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive rounded-4 overflow-hidden">
                  <table className="table table-borderless align-middle mb-0">
                    <thead className="table-light text-uppercase">
                      <tr>
                        <th className="text-secondary">Applicant</th>
                        <th className="text-secondary">Program</th>
                        <th className="text-secondary">Status</th>
                        <th className="text-secondary">Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApps.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-3 text-muted"
                          >
                            No recent applications.
                          </td>
                        </tr>
                      ) : (
                        recentApps.map((a, i) => (
                          <tr key={a._id || a.id || i}>
                            <td>
                              <div className="fw-semibold">
                                {(a.user?.first_name || "") +
                                  " " +
                                  (a.user?.last_name || "") ||
                                  a.user?.email ||
                                  "-"}
                              </div>
                              <div
                                className="text-muted"
                                style={{ fontSize: 12 }}
                              >
                                {a.user?.email || "-"}
                              </div>
                            </td>
                            <td>{a.program?.name || "-"}</td>
                            <td>
                              <span className="badge text-bg-secondary">
                                {a.status || "submitted"}
                              </span>
                            </td>
                            <td>
                              {a.applied_at
                                ? new Date(a.applied_at).toLocaleString()
                                : "-"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

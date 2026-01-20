import React from "react";
import ApplicationRow from "./ApplicationRow";

function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return isNaN(d) ? "-" : d.toLocaleString();
}

function fullName(user) {
  const first = user?.first_name || "";
  const last = user?.last_name || "";
  const name = `${first} ${last}`.trim();
  return name || user?.email || "-";
}

export default function ApplicationsTable({
  items,
  loading,
  error,
  onDelete,
  onChangeStatus,
  busyById = {},
}) {
  if (error) {
    return (
      <div className="alert alert-danger py-2 mb-3" role="alert">
        {error}
      </div>
    );
  }
  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="table-responsive rounded-4 overflow-hidden">
        <table className="table table-borderless align-middle mb-0">
          <thead className="table-light text-uppercase">
            <tr>
              <th className="text-secondary" scope="col">
                #
              </th>
              <th className="text-secondary" scope="col">
                Applicant (details)
              </th>
              <th className="text-secondary" scope="col">
                Program
              </th>
              <th className="text-secondary" scope="col">
                Status
              </th>
              <th className="text-secondary" scope="col">
                Applied
              </th>
              <th className="text-secondary" scope="col">
                File
              </th>
              <th className="text-secondary text-end" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading applications...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            ) : (
              items.map((app, idx) => (
                <ApplicationRow
                  key={app._id || app.id || idx}
                  index={idx}
                  app={app}
                  busy={!!busyById[app._id || app.id]}
                  onChangeStatus={onChangeStatus}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

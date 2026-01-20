import React from "react";

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

export default function ApplicationRow({
  index,
  app,
  onDelete,
  onChangeStatus,
  busy,
}) {
  const user = app.user || {};
  const program = app.program || {};
  const fileUrl = app.national_id_file
    ? `http://localhost:3000${app.national_id_file}`
    : null;
  const id = app._id || app.id;
  const status = String(app.status || "submitted").toLowerCase();
  const canApprove = status !== "approved";
  const canReject = status !== "rejected";
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td>
        <div className="fw-semibold">{fullName(user)}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>
          {user.email || "-"}
        </div>
        <div className="text-muted" style={{ fontSize: 12 }}>
          School: {user.school || app.school || "-"}
        </div>
        <div className="text-muted" style={{ fontSize: 12 }}>
          DOB: {user.date_of_birth || app.date_of_birth || "-"}
        </div>
        <div className="text-muted" style={{ fontSize: 12 }}>
          National ID:{" "}
          {user.national_id_number || app.national_id_number || "-"}
        </div>
      </td>
      <td>{program.name || "-"}</td>
      <td>
        <span className="badge text-bg-secondary">
          {app.status || "submitted"}
        </span>
      </td>
      <td>{formatDate(app.applied_at)}</td>
      <td>
        {fileUrl ? (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        ) : (
          <span className="text-muted">No file</span>
        )}
      </td>
      <td className="text-end">
        <div className="d-inline-flex align-items-center gap-2">
          <button
            className="btn btn-outline-success btn-sm"
            title="Approve"
            disabled={busy || !canApprove}
            onClick={() => onChangeStatus && onChangeStatus(app, "approved")}
          >
            {busy ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi bi-check2-circle"></i>
            )}
            <span className="ms-1">Approve</span>
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            title="Reject"
            disabled={busy || !canReject}
            onClick={() => onChangeStatus && onChangeStatus(app, "rejected")}
          >
            {busy ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi bi-x-circle"></i>
            )}
            <span className="ms-1">Reject</span>
          </button>
        </div>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(app)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

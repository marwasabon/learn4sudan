import React from "react";

export default function AdminPanel({
  title,
  searchTerm,
  onSearchChange,
  onAddClick,
  addLabel = "Add",
  children,
}) {
  return (
    <div className="container py-3">
      <div>
        <div className="card-body d-flex gap-2 justify-content-between">
          <h5 className="mb-0 fw-semibold">{title}</h5>
          <div
            className="d-flex gap-2 align-items-center"
            style={{ maxWidth: 520 }}
          >
            <input
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <button className="btn btn-primary rounded-3" onClick={onAddClick}>
              {addLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">{children}</div>
      </div>
    </div>
  );
}

import React from "react";

export default function UsersHeader({ search, onSearch, onAdd }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-3">
      <div className="card-header bg-white border-0 py-3 d-flex align-items-center justify-content-between rounded-4">
        <h2 className="h5 mb-0">Users</h2>
        <div className="d-flex align-items-center gap-2">
          <div className="input-group" style={{ width: 320 }}>
            <span className="input-group-text bg-white">
              <i className="bi bi-search" />
            </span>
            <input
              className="form-control"
              placeholder="Search by email or name"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={onAdd}>
            <i className="bi bi-plus-lg me-1"></i> Add
          </button>
        </div>
      </div>
    </div>
  );
}

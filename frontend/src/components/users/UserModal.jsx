import React from "react";

export default function UserModal({
  show,
  editing,
  form,
  error,
  onClose,
  onChange,
  onSubmit,
  roleOptions = [],
}) {
  if (!show) return null;
  const setField = (name, value) => onChange({ ...form, [name]: value });
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editing ? "Edit User" : "Add User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger py-2 mb-3">{error}</div>
            )}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  value={form.first_name}
                  onChange={(e) => setField("first_name", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  value={form.last_name}
                  onChange={(e) => setField("last_name", e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="blocked">blocked</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Roles</label>
                <select
                  className="form-select"
                  multiple
                  value={form.roles || []}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(
                      (opt) => opt.value
                    );
                    setField("roles", selected);
                  }}
                >
                  {roleOptions.map((r) => (
                    <option key={r._id || r.id} value={r._id || r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <div className="form-text">
                  Hold Ctrl/Command to select multiple.
                </div>
              </div>
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  {editing ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function RoleModal({
  show,
  editing,
  error,
  form,
  setForm,
  onSubmit,
  onClose,
}) {
  if (!show) return null;
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
              {editing ? "Edit Role" : "Add Role"}
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
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Optional"
                />
              </div>
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  {editing ? "Update Role" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

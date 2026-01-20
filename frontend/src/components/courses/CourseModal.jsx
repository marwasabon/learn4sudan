import React from "react";

export default function CourseModal({
  show,
  editing,
  error,
  form,
  setForm,
  categories,
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
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editing ? "Edit Course" : "Add Course"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger py-2 mb-3" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Enter course title"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Language</label>
                  <input
                    className="form-control"
                    value={form.language}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, language: e.target.value }))
                    }
                    placeholder="e.g. English"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Level</label>
                  <select
                    className="form-select"
                    value={form.level}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, level: e.target.value }))
                    }
                  >
                    <option value="">Select level</option>
                    <option value="beginner">beginner</option>
                    <option value="intermediate">intermediate</option>
                    <option value="advanced">advanced</option>
                    <option value="mixed">mixed</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Hours</label>
                  <input
                    className="form-control"
                    type="number"
                    value={form.hours}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, hours: e.target.value }))
                    }
                    placeholder="e.g. 20"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Short Description</label>
                  <input
                    className="form-control"
                    value={form.short_description}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        short_description: e.target.value,
                      }))
                    }
                    placeholder="Optional"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">URL</label>
                  <input
                    className="form-control"
                    value={form.url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, url: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check">
                    <input
                      id="is_active"
                      className="form-check-input"
                      type="checkbox"
                      checked={!!form.is_active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, is_active: e.target.checked }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="is_active"
                    >
                      Active
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-success" type="submit">
                  {editing ? "Update Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

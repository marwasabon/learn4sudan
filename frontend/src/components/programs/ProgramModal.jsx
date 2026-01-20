import React from "react";
import { API_ORIGIN } from "../../api/programsApi.js";

function resolveImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return "/" + url;
}

export default function ProgramModal({
  show,
  editing,
  error,
  form,
  setForm,
  onSubmit,
  onClose,
  courses,
  imageFile,
  imageName,
  setImageFile,
  setImageName,
  addCourseEntry,
  updateCourseEntry,
  removeCourseEntry,
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
        className="modal-dialog modal-xl modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editing ? "Edit Program" : "Add Program"}
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
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Enter program name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Capacity</label>
                  <input
                    className="form-control"
                    type="number"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, capacity: e.target.value }))
                    }
                    placeholder="e.g. 100"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Optional"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="draft">draft</option>
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                    <option value="in_progress">in_progress</option>
                    <option value="completed">completed</option>
                    <option value="archived">archived</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Program Image</label>
                  {editing && (editing.image_url || imageName) ? (
                    <div className="d-flex align-items-center gap-3 mb-2">
                      {editing.image_url && (
                        <img
                          src={resolveImageUrl(editing.image_url)}
                          alt={editing.name}
                          className="rounded border"
                          style={{
                            width: 64,
                            height: 64,
                            objectFit: "contain",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      {imageName && (
                        <span className="text-muted small">
                          Selected: {imageName}
                        </span>
                      )}
                    </div>
                  ) : null}
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      setImageName(file?.name || "");
                    }}
                  />
                  <div className="form-text">
                    Optional. JPG/PNG/PDF up to 5MB.
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Application Open</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.application_open_at}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        application_open_at: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Application Close</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.application_close_at}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        application_close_at: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.start_date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, start_date: e.target.value }))
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.end_date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, end_date: e.target.value }))
                    }
                  />
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between">
                    <label className="form-label m-0">Courses</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={addCourseEntry}
                    >
                      Add Course
                    </button>
                  </div>
                  <div className="mt-2">
                    {form.courses.length === 0 ? (
                      <div className="text-muted">No courses added.</div>
                    ) : (
                      <div className="d-flex flex-column gap-2">
                        {form.courses.map((c, idx) => (
                          <div key={idx} className="border rounded p-2">
                            <div className="row g-2 align-items-center">
                              <div className="col-md-6">
                                <select
                                  className="form-select"
                                  value={c.course}
                                  onChange={(e) =>
                                    updateCourseEntry(idx, {
                                      course: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select course</option>
                                  {courses.map((co) => (
                                    <option
                                      key={co._id || co.id}
                                      value={co._id || co.id}
                                    >
                                      {co.title}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-md-3">
                                <div className="form-check">
                                  <input
                                    id={`req_${idx}`}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={!!c.is_required}
                                    onChange={(e) =>
                                      updateCourseEntry(idx, {
                                        is_required: e.target.checked,
                                      })
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`req_${idx}`}
                                  >
                                    Required
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <input
                                  className="form-control"
                                  type="number"
                                  placeholder="#"
                                  value={c.sequence_no ?? ""}
                                  onChange={(e) =>
                                    updateCourseEntry(idx, {
                                      sequence_no: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="col-md-1 text-end">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => removeCourseEntry(idx)}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-success" type="submit">
                  {editing ? "Update Program" : "Create Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

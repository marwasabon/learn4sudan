import React from "react";

export default function ApplyForm({
  fullName,
  setFullName,
  school,
  setSchool,
  fileName,
  setFileName,
  extractedDob,
  setExtractedDob,
  extractedIdNumber,
  setExtractedIdNumber,
  reason,
  setReason,
  extracting,
  submitting,
  error,
  ok,
  onExtract,
  onSubmit,
  fileInputRef,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <div className="fw-semibold"> Application form</div>
        <div className="text-muted small">
          Fill in your details and upload your ID.
        </div>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}
        {ok && (
          <div className="alert alert-success py-2" role="alert">
            Application submitted!
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-2">
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                readOnly
                placeholder="Your full name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">University / School</label>
              <input
                type="text"
                className="form-control"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="University / School"
                required
              />
            </div>

            <div className="col-sm-6">
              <label className="form-label">Upload National ID</label>
              <input
                type="file"
                ref={fileInputRef}
                className="form-control"
                disabled={extracting}
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
              <div className="form-text">
                {fileName ? (
                  <span>Selected: {fileName}</span>
                ) : (
                  <span>Accepted: JPG, PNG, PDF. Max 5MB.</span>
                )}
              </div>
              <button
                type="button"
                onClick={onExtract}
                className="btn btn-outline-success btn-sm mt-2 d-inline-flex align-items-center gap-2"
                disabled={extracting}
                aria-busy={extracting}
              >
                {extracting && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                <span>
                  {extracting ? "Extracting..." : "🪪 Extract from ID"}
                </span>
              </button>
            </div>

            <div className="col-sm-6">
              <label className="form-label">Preview</label>
              <div className="border rounded p-2 small text-muted">
                {extracting && (
                  <div className="text-success">Extracting data...</div>
                )}
                <div>DOB: {extractedDob || "-"}</div>
                <div>ID/Passport: {extractedIdNumber || "-"}</div>
                <div>Full Name: {fullName || "-"}</div>
              </div>
            </div>

            <div className="col-sm-6">
              <label className="form-label">Date of Birth (extracted)</label>
              <input
                type="text"
                className="form-control"
                value={extractedDob}
                readOnly
                placeholder="YYYY-MM-DD or DD/MM/YYYY"
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">
                National ID / Passport No. (extracted)
              </label>
              <input
                type="text"
                className="form-control"
                value={extractedIdNumber}
                readOnly
                placeholder="ID / Passport Number"
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                Why do you want this scholarship?
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us about your motivation"
                required
              />
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={submitting || extracting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

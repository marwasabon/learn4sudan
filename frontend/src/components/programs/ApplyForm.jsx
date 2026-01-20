import React, { useState } from "react";

export default function ApplyForm({ program, onClose }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);
    try {
      const res = await fetch("http://localhost:3000/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          school,
          reason,
          programId: program?._id || program?.id,
        }),
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed with status ${res.status}`);
      }
      setOk(true);
    } catch (e) {
      setError(e.message || "Failed to submit application");
    }
  };

  return (
    <form onSubmit={submit}>
      {error && (
        <div className="alert alert-danger py-2 mb-2" role="alert">
          {error}
        </div>
      )}
      {ok && (
        <div className="alert alert-success py-2 mb-2" role="alert">
          Application submitted!
        </div>
      )}
      <div className="mb-2">
        <label className="form-label">Full Name</label>
        <input
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">School</label>
        <input
          className="form-control"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Reason</label>
        <textarea
          className="form-control"
          rows={2}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
}

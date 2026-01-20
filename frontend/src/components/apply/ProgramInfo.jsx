import React from "react";
import { API_ORIGIN } from "../../api/programsApi.js";

function resolveImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return "/" + url;
}

export default function ProgramInfo({ program }) {
  if (!program) return null;
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex align-items-start gap-3">
          {program.image_url ? (
            <img
              src={resolveImageUrl(program.image_url)}
              alt={program.name}
              className="rounded border"
              style={{ width: 72, height: 72, objectFit: "contain" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : null}
          <div>
            <div className="fw-semibold">About this program</div>
            {program.description ? (
              <div className="text-muted small">{program.description}</div>
            ) : (
              <div className="text-muted small">No description available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

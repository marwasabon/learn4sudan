import React from "react";
import { API_ORIGIN } from "../../api/programsApi.js";

function resolveImageUrl(url) {
  if (!url) return "";
  // Absolute URLs or data URIs
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  // If backend serves uploads under /uploads, prefix with API origin
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  // Otherwise treat as relative to public assets
  return "/" + url;
}

export default function ProgramsSection({ programs, onApply }) {
  return (
    <section id="programs" className="programs">
      <h2>Our Programs</h2>
      <div className="program-grid">
        {programs.map((p) => (
          <div key={p._id || p.id} className="program">
            {p.image_url ? (
              <img
                src={resolveImageUrl(p.image_url)}
                alt={p.name}
                loading="lazy"
                className="program-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            <h3 className="program-title">{p.name}</h3>
            {p.description && <p className="program-desc">{p.description}</p>}
            <div className="program-actions">
              {p.status && <span className="program-status">{p.status}</span>}
              <button
                type="button"
                className="btn-primary"
                onClick={() => onApply(p._id || p.id)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

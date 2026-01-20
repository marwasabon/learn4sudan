import React from "react";
import ApplyForm from "./ApplyForm";

export default function ApplyModal({ open, program, onClose }) {
  if (!open) return null;
  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Apply to {program?.name}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <ApplyForm program={program} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

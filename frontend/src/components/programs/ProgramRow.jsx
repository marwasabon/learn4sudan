import React from "react";

export default function ProgramRow({
  index,
  program,
  onEdit,
  onDelete,
  onApply,
}) {
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td className="fw-semibold">{program.name}</td>
      <td>{program.status || "draft"}</td>
      <td>{program.capacity ?? "-"}</td>
      <td>{program.courses?.length ?? 0}</td>
      <td className="text-end">
        <button
          className="btn btn-link p-0 me-2"
          title="Apply"
          onClick={() => onApply(program)}
        >
          <i
            className="bi bi-box-arrow-in-right"
            style={{ color: "#16a34a" }}
          ></i>
        </button>
        <button
          className="btn btn-link p-0 me-2"
          title="Edit"
          onClick={() => onEdit(program)}
        >
          <i className="bi bi-pencil-square" style={{ color: "#0d47a1" }}></i>
        </button>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(program)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

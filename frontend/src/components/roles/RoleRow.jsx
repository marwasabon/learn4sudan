import React from "react";

export default function RoleRow({ index, role, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td className="fw-semibold text-uppercase">{role.name}</td>
      <td className="text-muted">{role.description || ""}</td>
      <td className="text-end">
        <button
          className="btn btn-link p-0 me-2"
          title="Edit"
          onClick={() => onEdit(role)}
        >
          <i className="bi bi-pencil-square" style={{ color: "#0d47a1" }}></i>
        </button>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(role)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

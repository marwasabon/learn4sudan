import React from "react";

export default function CategoryRow({ index, category, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td className="fw-semibold">{category.name}</td>
      <td className="text-end">
        <button
          className="btn btn-link p-0 me-2"
          title="Edit"
          onClick={() => onEdit(category)}
        >
          <i className="bi bi-pencil-square" style={{ color: "#0d47a1" }}></i>
        </button>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(category)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

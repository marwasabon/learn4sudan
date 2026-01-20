import React from "react";

export default function UserRow({ index, user, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td className="fw-semibold">{user.email}</td>
      <td>{user.first_name || "-"}</td>
      <td>{user.last_name || "-"}</td>
      <td>
        <span className="badge text-bg-secondary">
          {user.status || "active"}
        </span>
      </td>
      <td className="text-end">
        <button
          className="btn btn-link p-0 me-2"
          title="Edit"
          onClick={() => onEdit(user)}
        >
          <i className="bi bi-pencil-square" style={{ color: "#0d47a1" }}></i>
        </button>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(user)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

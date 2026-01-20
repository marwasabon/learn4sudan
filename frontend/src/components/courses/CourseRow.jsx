import React from "react";

export default function CourseRow({ index, course, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-muted">{index + 1}</td>
      <td className="fw-semibold">{course.title}</td>
      <td>{course.level || "-"}</td>
      <td>{course.language || "-"}</td>
      <td>{course.hours ?? "-"}</td>
      <td>{course.category?.name || "-"}</td>
      <td>
        <span
          className={`badge ${
            course.is_active ? "text-bg-success" : "text-bg-secondary"
          }`}
        >
          {course.is_active ? "active" : "inactive"}
        </span>
      </td>
      <td className="text-end">
        <button
          className="btn btn-link p-0 me-2"
          title="Edit"
          onClick={() => onEdit(course)}
        >
          <i className="bi bi-pencil-square" style={{ color: "#0d47a1" }}></i>
        </button>
        <button
          className="btn btn-link p-0"
          title="Delete"
          onClick={() => onDelete(course)}
        >
          <i className="bi bi-trash3-fill" style={{ color: "#e11d48" }}></i>
        </button>
      </td>
    </tr>
  );
}

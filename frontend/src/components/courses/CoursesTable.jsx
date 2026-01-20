import React from "react";
import CourseRow from "./CourseRow";

export default function CoursesTable({ items, loading, onEdit, onDelete }) {
  return (
    <div className="table-responsive rounded-4 overflow-hidden">
      <table className="table table-borderless align-middle mb-0">
        <thead className="table-light text-uppercase">
          <tr>
            <th className="text-secondary">#</th>
            <th className="text-secondary">Title</th>
            <th className="text-secondary">Level</th>
            <th className="text-secondary">Language</th>
            <th className="text-secondary">Hours</th>
            <th className="text-secondary">Category</th>
            <th className="text-secondary">Status</th>
            <th className="text-secondary text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Loading courses...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                No courses found.
              </td>
            </tr>
          ) : (
            items.map((course, idx) => (
              <CourseRow
                key={course._id || course.id || idx}
                index={idx}
                course={course}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

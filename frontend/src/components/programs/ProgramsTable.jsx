import React from "react";
import ProgramRow from "./ProgramRow";

export default function ProgramsTable({
  items,
  loading,
  onEdit,
  onDelete,
  onApply,
}) {
  return (
    <div className="table-responsive rounded-4 overflow-hidden">
      <table className="table table-borderless align-middle mb-0">
        <thead className="table-light text-uppercase">
          <tr>
            <th className="text-secondary">#</th>
            <th className="text-secondary">Name</th>
            <th className="text-secondary">Status</th>
            <th className="text-secondary">Capacity</th>
            <th className="text-secondary">Courses</th>
            <th className="text-secondary text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                Loading programs...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No programs found.
              </td>
            </tr>
          ) : (
            items.map((program, idx) => (
              <ProgramRow
                key={program._id || program.id || idx}
                index={idx}
                program={program}
                onEdit={onEdit}
                onDelete={onDelete}
                onApply={onApply}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

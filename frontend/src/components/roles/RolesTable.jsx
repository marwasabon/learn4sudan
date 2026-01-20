import React from "react";
import RoleRow from "./RoleRow";

export default function RolesTable({ items, loading, onEdit, onDelete }) {
  return (
    <div className="table-responsive rounded-4 overflow-hidden">
      <table className="table table-borderless align-middle mb-0">
        <thead className="table-light text-uppercase">
          <tr>
            <th className="text-secondary" scope="col">
              #
            </th>
            <th className="text-secondary" scope="col">
              Name
            </th>
            <th className="text-secondary" scope="col">
              Description
            </th>
            <th className="text-secondary text-end" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading roles...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No roles found.
              </td>
            </tr>
          ) : (
            items.map((role, idx) => (
              <RoleRow
                key={role._id || role.id || idx}
                index={idx}
                role={role}
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

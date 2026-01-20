import React from "react";
import UserRow from "./UserRow";

export default function UsersTable({ items, loading, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="table-responsive rounded-4 overflow-hidden">
        <table className="table table-borderless align-middle mb-0">
          <thead className="table-light text-uppercase">
            <tr>
              <th className="text-secondary" scope="col">
                #
              </th>
              <th className="text-secondary" scope="col">
                Email
              </th>
              <th className="text-secondary" scope="col">
                First Name
              </th>
              <th className="text-secondary" scope="col">
                Last Name
              </th>
              <th className="text-secondary" scope="col">
                Status
              </th>
              <th className="text-secondary text-end" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading users...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              items.map((user, idx) => (
                <UserRow
                  key={user._id || user.id || idx}
                  index={idx}
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

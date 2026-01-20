import React from "react";
import CategoryRow from "./CategoryRow";

export default function CategoriesTable({ items, loading, onEdit, onDelete }) {
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
            <th className="text-secondary text-end" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Loading categories...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No categories found.
              </td>
            </tr>
          ) : (
            items.map((category, idx) => (
              <CategoryRow
                key={category._id || category.id || idx}
                index={idx}
                category={category}
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

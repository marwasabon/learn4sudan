import { useEffect, useMemo, useState } from "react";
import rolesApi from "../api/rolesApi.js";
import AdminPanel from "../components/AdminPanel";
import RolesTable from "../components/roles/RolesTable";
import RoleModal from "../components/roles/RoleModal";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await rolesApi.getRoles();
        setRoles(Array.isArray(data) ? data : data?.roles || []);
      } catch (e) {
        setError(e.message || "Failed to load roles");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return roles;
    return roles.filter((r) =>
      [r.name, r.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [roles, search]);

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditing(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.name.trim()) throw new Error("Role name is required");
      const payload = {
        name: form.name.trim(),
        description: form.description?.trim() || "",
      };
      if (editing) {
        const updated = await rolesApi.updateRole(
          editing._id || editing.id,
          payload
        );
        setRoles((prev) =>
          prev.map((r) =>
            (r._id || r.id) === (editing._id || editing.id)
              ? updated ?? { ...r, ...payload }
              : r
          )
        );
      } else {
        const created = await rolesApi.createRole(payload);
        setRoles((prev) =>
          created
            ? [created, ...prev]
            : [
                { ...payload, _id: Math.random().toString(36).slice(2) },
                ...prev,
              ]
        );
      }
      resetForm();
    } catch (e) {
      setError(e.message || "Failed to submit role");
    }
  };

  const onEdit = (role) => {
    setEditing(role);
    setForm({ name: role.name || "", description: role.description || "" });
    setShowModal(true);
  };

  const onDelete = async (role) => {
    const id = role._id || role.id;
    if (!id) return;
    if (!confirm(`Delete role "${role.name}"?`)) return;
    setError("");
    try {
      await rolesApi.deleteRole(id);
      setRoles((prev) => prev.filter((r) => (r._id || r.id) !== id));
      if (editing && (editing._id || editing.id) === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete role");
    }
  };

  return (
    <AdminPanel
      title="Roles"
      searchTerm={search}
      onSearchChange={setSearch}
      onAddClick={() => {
        setEditing(null);
        setForm({ name: "", description: "" });
        setShowModal(true);
      }}
    >
      <RolesTable
        items={filtered}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <RoleModal
        show={showModal}
        editing={editing}
        error={error}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
      />
    </AdminPanel>
  );
}

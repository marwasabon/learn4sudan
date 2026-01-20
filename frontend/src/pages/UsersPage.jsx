import { useEffect, useMemo, useState } from "react";
import usersApi from "../api/usersApi.js";
import rolesApi from "../api/rolesApi.js";
import UsersHeader from "../components/users/UsersHeader";
import UsersTable from "../components/users/UsersTable";
import UserModal from "../components/users/UserModal";

// Helpers
function userMatchesTerm(u, term) {
  return [u.email, u.first_name, u.last_name]
    .filter(Boolean)
    .some((v) => String(v).toLowerCase().includes(term));
}

// Components moved to `components/users/*`

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    status: "active",
  });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [usersData, rolesData] = await Promise.all([
          usersApi.getUsers(),
          rolesApi.getRoles(),
        ]);
        setUsers(Array.isArray(usersData) ? usersData : usersData?.users || []);
        setRoles(Array.isArray(rolesData) ? rolesData : rolesData?.roles || []);
      } catch (e) {
        setError(e.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((u) => userMatchesTerm(u, term));
  }, [users, search]);

  function resetForm() {
    setForm({
      email: "",
      first_name: "",
      last_name: "",
      status: "active",
      roles: [],
    });
    setEditing(null);
    setShowModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (!form.email.trim()) throw new Error("Email is required");
      const payload = {
        email: form.email.trim(),
        first_name: form.first_name?.trim() || "",
        last_name: form.last_name?.trim() || "",
        status: form.status || "active",
        roles: Array.isArray(form.roles) ? form.roles : [],
      };
      if (editing) {
        const updated = await usersApi.updateUser(
          editing._id || editing.id,
          payload
        );
        setUsers((prev) =>
          prev.map((u) =>
            u._id === (editing._id || editing.id)
              ? updated ?? { ...u, ...payload }
              : u
          )
        );
      } else {
        const created = await usersApi.createUser(payload);
        setUsers((prev) =>
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
      setError(e.message || "Failed to submit user");
    }
  }

  function onAdd() {
    setEditing(null);
    setForm({
      email: "",
      first_name: "",
      last_name: "",
      status: "active",
      roles: [],
    });
    setShowModal(true);
  }

  function onEdit(user) {
    setEditing(user);
    setForm({
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      status: user.status || "active",
      roles: (user.roles || []).map((r) => r._id || r.id || r),
    });
    setShowModal(true);
  }

  async function onDelete(user) {
    const id = user._id || user.id;
    if (!id) return;
    if (!confirm(`Delete user "${user.email}"?`)) return;
    setError("");
    try {
      await usersApi.deleteUser(id);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
      if (editing && (editing._id || editing.id) === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete user");
    }
  }

  return (
    <section className="py-3">
      <div className="container-fluid px-2">
        <UsersHeader search={search} onSearch={setSearch} onAdd={onAdd} />
        <UsersTable
          items={filtered}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <UserModal
          show={showModal}
          editing={editing}
          form={form}
          error={error}
          onClose={() => setShowModal(false)}
          onChange={setForm}
          onSubmit={handleSubmit}
          roleOptions={roles}
        />
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import categoriesApi from "../api/categoriesApi.js";
import AdminPanel from "../components/AdminPanel";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryModal from "../components/categories/CategoryModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "" });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await categoriesApi.getCategories();
        setCategories(Array.isArray(data) ? data : data?.categories || []);
      } catch (e) {
        setError(e.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((c) =>
      String(c.name || "")
        .toLowerCase()
        .includes(term)
    );
  }, [categories, search]);

  const resetForm = () => {
    setForm({ name: "" });
    setEditing(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.name.trim()) throw new Error("Category name is required");
      const payload = { name: form.name.trim() };
      if (editing) {
        const updated = await categoriesApi.updateCategory(
          editing._id || editing.id,
          payload
        );
        setCategories((prev) =>
          prev.map((c) =>
            c._id === (editing._id || editing.id)
              ? updated ?? { ...c, ...payload }
              : c
          )
        );
      } else {
        const created = await categoriesApi.createCategory(payload);
        setCategories((prev) =>
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
      setError(e.message || "Failed to submit category");
    }
  };

  const onEdit = (category) => {
    setEditing(category);
    setForm({ name: category.name || "" });
    setShowModal(true);
  };

  const onDelete = async (category) => {
    const id = category._id || category.id;
    if (!id) return;
    if (!confirm(`Delete category "${category.name}"?`)) return;
    setError("");
    try {
      await categoriesApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => (c._id || c.id) !== id));
      if (editing && (editing._id || editing.id) === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete category");
    }
  };

  return (
    <AdminPanel
      title="Categories"
      searchTerm={search}
      onSearchChange={setSearch}
      onAddClick={() => {
        setEditing(null);
        setForm({ name: "" });
        setShowModal(true);
      }}
    >
      <CategoriesTable
        items={filtered}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CategoryModal
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

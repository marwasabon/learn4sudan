import { useEffect, useMemo, useState } from "react";
import appsApi from "../api/applicationsApi.js";
import ApplicationsHeader from "../components/applications/ApplicationsHeader";
import ApplicationsTable from "../components/applications/ApplicationsTable";

export default function ApplicationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [busyById, setBusyById] = useState({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await appsApi.getApplications();
        setItems(Array.isArray(data) ? data : data?.applications || []);
      } catch (e) {
        setError(e.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((a) => {
      const user = a.user || {};
      const program = a.program || {};
      const values = [
        user.email,
        user.first_name,
        user.last_name,
        program.name,
        a.status,
      ];
      return values
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [items, search]);

  async function onDelete(app) {
    const id = app._id || app.id;
    if (!id) return;
    if (!confirm("Delete application?")) return;
    setError("");
    try {
      await appsApi.deleteApplication(id);
      setItems((prev) => prev.filter((a) => (a._id || a.id) !== id));
    } catch (e) {
      setError(e.message || "Failed to delete application");
    }
  }

  async function onChangeStatus(app, status) {
    const id = app._id || app.id;
    if (!id) return;
    const label =
      status === "approved"
        ? "Approve"
        : status === "rejected"
        ? "Reject"
        : "Update";
    if (!confirm(`${label} this application?`)) return;
    setError("");
    setBusyById((m) => ({ ...m, [id]: true }));
    try {
      const updated = await appsApi.updateApplication(id, { status });
      setItems((prev) =>
        prev.map((a) => ((a._id || a.id) === id ? { ...a, ...updated } : a))
      );
    } catch (e) {
      setError(e.message || `Failed to ${label.toLowerCase()} application`);
    } finally {
      setBusyById((m) => {
        const { [id]: _, ...rest } = m;
        return rest;
      });
    }
  }

  return (
    <section className="py-3">
      <div className="container-fluid px-2">
        <ApplicationsHeader search={search} onSearch={setSearch} />
        <ApplicationsTable
          items={filtered}
          loading={loading}
          error={error}
          busyById={busyById}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
}

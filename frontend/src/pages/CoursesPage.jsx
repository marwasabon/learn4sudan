import { useEffect, useMemo, useState } from "react";
import coursesApi from "../api/coursesApi.js";
import categoriesApi from "../api/categoriesApi.js";
import AdminPanel from "../components/AdminPanel";
import CoursesTable from "../components/courses/CoursesTable";
import CourseModal from "../components/courses/CourseModal";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "",
    short_description: "",
    url: "",
    level: "",
    language: "",
    hours: "",
    rating: "",
    category: "",
    is_active: true,
  });
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [courseData, categoryData] = await Promise.all([
          coursesApi.getCourses(),
          categoriesApi.getCategories(),
        ]);
        setCourses(
          Array.isArray(courseData) ? courseData : courseData?.courses || []
        );
        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : categoryData?.categories || []
        );
      } catch (e) {
        setError(e.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((c) =>
      [c.title, c.short_description, c.language]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [courses, search]);

  const resetForm = () => {
    setForm({
      title: "",
      short_description: "",
      url: "",
      level: "",
      language: "",
      hours: "",
      rating: "",
      category: "",
      is_active: true,
    });
    setEditing(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.title.trim()) throw new Error("Course title is required");
      const payload = {
        title: form.title.trim(),
        short_description: form.short_description?.trim() || "",
        url: form.url?.trim() || "",
        level: form.level || undefined,
        language: form.language?.trim() || "",
        hours: form.hours ? Number(form.hours) : undefined,
        rating: form.rating ? Number(form.rating) : undefined,
        category: form.category || undefined,
        is_active: !!form.is_active,
      };
      if (editing) {
        const updated = await coursesApi.updateCourse(
          editing._id || editing.id,
          payload
        );
        setCourses((prev) =>
          prev.map((c) =>
            c._id === (editing._id || editing.id)
              ? updated ?? { ...c, ...payload }
              : c
          )
        );
      } else {
        const created = await coursesApi.createCourse(payload);
        setCourses((prev) =>
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
      setError(e.message || "Failed to submit course");
    }
  };

  const onEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title || "",
      short_description: course.short_description || "",
      url: course.url || "",
      level: course.level || "",
      language: course.language || "",
      hours: course.hours ?? "",
      rating: course.rating ?? "",
      category: course.category?._id || course.category || "",
      is_active: !!course.is_active,
    });
    setShowModal(true);
  };

  const onDelete = async (course) => {
    const id = course._id || course.id;
    if (!id) return;
    if (!confirm(`Delete course \"${course.title}\"?`)) return;
    setError("");
    try {
      await coursesApi.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => (c._id || c.id) !== id));
      if (editing && (editing._id || editing.id) === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete course");
    }
  };

  return (
    <AdminPanel
      title="Courses"
      searchTerm={search}
      onSearchChange={setSearch}
      onAddClick={() => {
        setEditing(null);
        setForm({
          title: "",
          short_description: "",
          url: "",
          level: "",
          language: "",
          hours: "",
          rating: "",
          category: "",
          is_active: true,
        });
        setShowModal(true);
      }}
    >
      <CoursesTable
        items={filtered}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <CourseModal
        show={showModal}
        editing={editing}
        error={error}
        form={form}
        setForm={setForm}
        categories={categories}
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
      />
    </AdminPanel>
  );
}

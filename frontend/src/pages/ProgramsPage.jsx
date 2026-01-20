import { useEffect, useMemo, useState } from "react";
import programsApi from "../api/programsApi.js";
import coursesApi from "../api/coursesApi.js";
import AdminPanel from "../components/AdminPanel";
import ProgramsTable from "../components/programs/ProgramsTable";
import ApplyModal from "../components/programs/ApplyModal";
import ProgramModal from "../components/programs/ProgramModal";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    capacity: "",
    status: "draft",
    application_open_at: "",
    application_close_at: "",
    start_date: "",
    end_date: "",
    courses: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [editing, setEditing] = useState(null);
  const [applyModal, setApplyModal] = useState({ open: false, program: null });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [programData, courseData] = await Promise.all([
          programsApi.getPrograms(),
          coursesApi.getCourses(),
        ]);
        setPrograms(
          Array.isArray(programData) ? programData : programData?.programs || []
        );
        setCourses(
          Array.isArray(courseData) ? courseData : courseData?.courses || []
        );
      } catch (e) {
        setError(e.message || "Failed to load programs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return programs;
    return programs.filter((p) =>
      [p.name, p.description, p.status]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [programs, search]);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      capacity: "",
      status: "draft",
      application_open_at: "",
      application_close_at: "",
      start_date: "",
      end_date: "",
      courses: [],
    });
    setImageFile(null);
    setImageName("");
    setEditing(null);
    setShowModal(false);
  };

  const addCourseEntry = () => {
    setForm((f) => ({
      ...f,
      courses: [
        ...f.courses,
        { course: "", is_required: false, sequence_no: f.courses.length + 1 },
      ],
    }));
  };

  const updateCourseEntry = (idx, patch) => {
    setForm((f) => ({
      ...f,
      courses: f.courses.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    }));
  };

  const removeCourseEntry = (idx) => {
    setForm((f) => ({
      ...f,
      courses: f.courses.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.name.trim()) throw new Error("Program name is required");
      const payload = {
        name: form.name.trim(),
        description: form.description?.trim() || "",
        capacity: form.capacity ? Number(form.capacity) : undefined,
        status: form.status || "draft",
        application_open_at: form.application_open_at || undefined,
        application_close_at: form.application_close_at || undefined,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        courses: (form.courses || [])
          .filter((c) => c.course)
          .map((c) => ({
            course: c.course,
            is_required: !!c.is_required,
            sequence_no: c.sequence_no ? Number(c.sequence_no) : undefined,
          })),
      };
      if (editing) {
        const id = editing._id || editing.id;
        let updated = await programsApi.updateProgram(id, payload);
        if (imageFile) {
          // update image and get latest doc
          const withImage = await programsApi.updateProgramImage(id, imageFile);
          updated = withImage || updated;
        }
        setPrograms((prev) =>
          prev.map((p) =>
            (p._id || p.id) === id ? updated ?? { ...p, ...payload } : p
          )
        );
      } else {
        let created = null;
        if (imageFile) {
          created = await programsApi.createProgramWithImage(
            payload,
            imageFile
          );
        } else {
          created = await programsApi.createProgram(payload);
        }
        setPrograms((prev) => (created ? [created, ...prev] : prev));
      }
      resetForm();
    } catch (e) {
      setError(e.message || "Failed to submit program");
    }
  };

  const onEdit = (program) => {
    setEditing(program);
    setForm({
      name: program.name || "",
      description: program.description || "",
      capacity: program.capacity ?? "",
      status: program.status || "draft",
      application_open_at: program.application_open_at
        ? program.application_open_at.slice(0, 10)
        : "",
      application_close_at: program.application_close_at
        ? program.application_close_at.slice(0, 10)
        : "",
      start_date: program.start_date ? program.start_date.slice(0, 10) : "",
      end_date: program.end_date ? program.end_date.slice(0, 10) : "",
      courses: (program.courses || []).map((pc) => ({
        course: pc.course?._id || pc.course || "",
        is_required: !!pc.is_required,
        sequence_no: pc.sequence_no ?? "",
      })),
    });
    setImageFile(null);
    setImageName("");
    setShowModal(true);
  };

  const onDelete = async (program) => {
    const id = program._id || program.id;
    if (!id) return;
    if (!confirm(`Delete program \"${program.name}\"?`)) return;
    setError("");
    try {
      await programsApi.deleteProgram(id);
      setPrograms((prev) => prev.filter((p) => (p._id || p.id) !== id));
      if (editing && (editing._id || editing.id) === id) resetForm();
    } catch (e) {
      setError(e.message || "Failed to delete program");
    }
  };

  const onApply = (program) => {
    setApplyModal({ open: true, program });
  };

  return (
    <AdminPanel
      title="Programs"
      searchTerm={search}
      onSearchChange={setSearch}
      onAddClick={() => {
        setEditing(null);
        setForm({
          name: "",
          description: "",
          capacity: "",
          status: "draft",
          application_open_at: "",
          application_close_at: "",
          start_date: "",
          end_date: "",
          courses: [],
        });
        setImageFile(null);
        setImageName("");
        setShowModal(true);
      }}
    >
      <ProgramsTable
        items={filtered}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
        onApply={onApply}
      />

      <ApplyModal
        open={applyModal.open}
        program={applyModal.program}
        onClose={() => setApplyModal({ open: false, program: null })}
      />

      <ProgramModal
        show={showModal}
        editing={editing}
        error={error}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
        courses={courses}
        imageFile={imageFile}
        imageName={imageName}
        setImageFile={setImageFile}
        setImageName={setImageName}
        addCourseEntry={addCourseEntry}
        updateCourseEntry={updateCourseEntry}
        removeCourseEntry={removeCourseEntry}
      />
    </AdminPanel>
  );
}


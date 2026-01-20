import express from "express";
import Program from "../models/Program.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const items = await Program.find().populate({ path: "courses.course" });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Program.findById(req.params.id).populate({
    path: "courses.course",
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const item = await Program.create(req.body);
  res.status(201).json(item);
});

// Create program with image upload (multipart/form-data)
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const payload = { ...req.body };

    // Parse JSON-encoded fields coming from multipart/form-data
    if (typeof payload.courses === "string") {
      try {
        const parsed = JSON.parse(payload.courses);
        if (Array.isArray(parsed)) {
          payload.courses = parsed.map((c) => ({
            course: c.course,
            is_required:
              typeof c.is_required === "string"
                ? c.is_required === "true"
                : !!c.is_required,
            sequence_no:
              typeof c.sequence_no === "string"
                ? Number(c.sequence_no)
                : c.sequence_no,
          }));
        }
      } catch (_) {
        // leave as-is; mongoose will validate and return an error
      }
    }

    // Optional date coercion if provided as strings
    [
      "application_open_at",
      "application_close_at",
      "start_date",
      "end_date",
    ].forEach((k) => {
      if (typeof payload[k] === "string" && payload[k]) {
        const d = new Date(payload[k]);
        if (!isNaN(d)) payload[k] = d;
      }
    });

    if (typeof payload.capacity === "string") {
      const n = Number(payload.capacity);
      if (!isNaN(n)) payload.capacity = n;
    }

    if (req.file) {
      payload.image_url = `/uploads/${req.file.filename}`;
    }
    const item = await Program.create(payload);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message || "Failed to create program" });
  }
});

router.patch("/:id", async (req, res) => {
  const item = await Program.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Update program image
router.post("/:id/image", upload.single("image"), async (req, res) => {
  try {
    const update = req.file
      ? { image_url: `/uploads/${req.file.filename}` }
      : {};
    const item = await Program.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message || "Failed to update image" });
  }
});

router.delete("/:id", async (req, res) => {
  const item = await Program.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

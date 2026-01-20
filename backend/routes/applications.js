import express from "express";
import Application from "../models/Application.js";
import User from "../models/User.js";
import { upload } from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const items = await Application.find().populate("user").populate("program");
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Application.findById(req.params.id)
    .populate("user")
    .populate("program");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const item = await Application.create(req.body);
  res.status(201).json(item);
});

// Authenticated application submission with file upload
router.post(
  "/submit",
  requireAuth,
  upload.single("nationalId"),
  async (req, res) => {
    try {
      const userId = req.user?.sub;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const {
        programId,
        school,
        reason,
        date_of_birth,
        national_id_number,
        full_name,
      } = req.body || {};

      if (!programId || !reason) {
        return res
          .status(400)
          .json({ error: "programId and reason are required" });
      }

      // update user profile 
      const userUpdate = {
        ...(school ? { school } : {}),
        ...(date_of_birth ? { date_of_birth } : {}),
        ...(national_id_number ? { national_id_number } : {}),
      };
      if (full_name && typeof full_name === "string") {
        const parts = full_name.trim().split(/\s+/);
        userUpdate.first_name = parts[0] || full_name.trim();
        userUpdate.last_name = parts.slice(1).join(" ") || "";
      }
      if (Object.keys(userUpdate).length > 0) {
        await User.findByIdAndUpdate(userId, userUpdate, { new: true });
      }

      const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      // Create  application  
      const application = await Application.findOneAndUpdate(
        { user: userId, program: programId },
        {
          user: userId,
          program: programId,
          status: "submitted",
          school: school || undefined,
          reason,
          date_of_birth: date_of_birth || undefined,
          national_id_number: national_id_number || undefined,
          ...(filePath ? { national_id_file: filePath } : {}),
          applied_at: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      res.status(201).json({ ok: true, application });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ error: e.message || "Failed to submit application" });
    }
  }
);

router.patch("/:id", async (req, res) => {
  const item = await Application.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Application.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

// List all roles
router.get("/", async (_req, res) => {
  const items = await Role.find();
  res.json(items);
});

// Get one role
router.get("/:id", async (req, res) => {
  const item = await Role.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Create role
router.post("/", async (req, res) => {
  const item = await Role.create(req.body);
  res.status(201).json(item);
});

// Update role
router.patch("/:id", async (req, res) => {
  const item = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// Delete role
router.delete("/:id", async (req, res) => {
  const item = await Role.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const items = await Course.find().populate("category");
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Course.findById(req.params.id).populate("category");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const item = await Course.create(req.body);
  res.status(201).json(item);
});

router.patch("/:id", async (req, res) => {
  const item = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Course.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

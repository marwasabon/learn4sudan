import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const items = await Category.find();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Category.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const item = await Category.create(req.body);
  res.status(201).json(item);
});

router.patch("/:id", async (req, res) => {
  const item = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await Category.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

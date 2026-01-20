import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const items = await User.find();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await User.findById(req.params.id).populate("roles");
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.post("/", async (req, res) => {
  const item = await User.create(req.body);
  res.status(201).json(item);
});

router.patch("/:id", async (req, res) => {
  const item = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const item = await User.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;

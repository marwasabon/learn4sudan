import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User.js";
import Role from "../models/Role.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().allow(""),
  last_name: Joi.string().allow(""),
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { email, password, first_name, last_name } = value;
  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Email already registered" });
    const password_hash = await bcrypt.hash(password, 10);
    let defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) {
      defaultRole = await Role.create({
        name: "user",
        description: "Default user role",
      });
    }

    let user = await User.create({
      email,
      password_hash,
      first_name,
      last_name,
      roles: [defaultRole._id],
    });

    user = await User.findById(user._id).populate("roles");
    const token = jwt.sign({ sub: user._id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email,
        first_name,
        last_name,
        roles: (user.roles || []).map((r) => ({ id: r._id, name: r.name })),
        isAdmin: (user.roles || []).some((r) => r.name === "admin"),
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to register" });
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { email, password } = value;
  try {
    const user = await User.findOne({ email }).populate("roles");
    if (!user || !user.password_hash)
      return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ sub: user._id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user._id,
        email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: (user.roles || []).map((r) => ({ id: r._id, name: r.name })),
        isAdmin: (user.roles || []).some((r) => r.name === "admin"),
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to login" });
  }
});

export default router;

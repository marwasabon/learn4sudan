import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./models/Role.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Course from "./models/Course.js";
import Program from "./models/Program.js";
import Application from "./models/Application.js";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic health route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/apply", (req, res) => {
  const { fullName, email, school, reason } = req.body || {};
  if (!fullName || !email || !school || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Example: upsert a user and create an application (demo only)
  User.findOneAndUpdate(
    { email },
    {
      email,
      first_name: fullName.split(" ")[0] || fullName,
      last_name: fullName.split(" ").slice(1).join(" "),
    },
    { upsert: true, new: true }
  )
    .then((user) => {
      return Program.findOne()
        .then((program) => {
          if (!program) {
            // create a placeholder program if none exists
            return Program.create({
              name: "General Scholarship",
              status: "open",
            });
          }
          return program;
        })
        .then((program) => {
          return Application.create({
            user: user._id,
            program: program._id,
            status: "submitted",
          });
        })
        .then((application) => {
          res.status(201).json({
            status: "received",
            applicant: { fullName, email, school },
            applicationId: application._id,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to submit application" });
    });
});

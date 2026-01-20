import authRouter from "./routes/auth.js";
import roleRouter from "./routes/roles.js";
import userRouter from "./routes/users.js";
import categoryRouter from "./routes/categories.js";
import courseRouter from "./routes/courses.js";
import programRouter from "./routes/programs.js";
import applicationRouter from "./routes/applications.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { upload } from "./middleware/upload.js";
import Role from "./models/Role.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Course from "./models/Course.js";
import Program from "./models/Program.js";
import Application from "./models/Application.js";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
// Serve uploaded files statically
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));
const PORT = 3000;
const mongoDBURL = process.env.MONGO_URI || "your_default_mongo_uri_here";
// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routers
app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/courses", courseRouter);
app.use("/api/programs", programRouter);
app.use("/api/applications", applicationRouter);

// Basic health route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/apply", upload.single("nationalId"), (req, res) => {
  const { fullName, email, school, reason, programId } = req.body || {};
  if (!fullName || !email || !school || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const uploadedFilePath = req.file
    ? `/uploads/${req.file.filename}`
    : undefined;
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
      const findProgram = programId
        ? Program.findById(programId)
        : Program.findOne({ status: "open" });
      return findProgram
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
            national_id_file: uploadedFilePath,
          });
        })
        .then((application) => {
          res.status(201).json({
            status: "received",
            applicant: { fullName, email, school },
            applicationId: application._id,
            program: programId || undefined,
            national_id_file: uploadedFilePath,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to submit application" });
    });
});

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Role from "./models/Role.js";
import Category from "./models/Category.js";
import Course from "./models/Course.js";
import Program from "./models/Program.js";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learn4sudan";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");

  const roles = ["admin", "mentor", "student", "user"].map((name) => ({
    name,
  }));
  await Role.deleteMany({});
  await Role.insertMany(roles);
  console.log("Seeded roles");

  const categories = ["Data Science", "Web Development", "Cloud", "Design"].map(
    (name) => ({ name })
  );
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log("Seeded categories");

  const catWeb = await Category.findOne({ name: "Web Development" });
  const catData = await Category.findOne({ name: "Data Science" });

  await Course.deleteMany({});
  const courses = await Course.insertMany([
    {
      title: "Intro to HTML & CSS",
      level: "beginner",
      language: "en",
      hours: 10,
      rating: 4.5,
      category: catWeb?._id,
    },
    {
      title: "JavaScript Fundamentals",
      level: "beginner",
      language: "en",
      hours: 20,
      rating: 4.6,
      category: catWeb?._id,
    },
    {
      title: "Python for Data Analysis",
      level: "beginner",
      language: "en",
      hours: 24,
      rating: 4.7,
      category: catData?._id,
    },
  ]);
  console.log("Seeded courses");

  await Program.deleteMany({});
  await Program.create({
    name: "General Scholarship",
    description: "Open program for scholarships",
    status: "open",
    courses: courses.map((c, i) => ({
      course: c._id,
      is_required: i < 2,
      sequence_no: i + 1,
    })),
  });
  console.log("Seeded program");

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

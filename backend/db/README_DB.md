# learn4Sudan Database Schema

This folder contains a simplified relational data model for a Coursera scholarship program, covering just the core entities: users, roles, categories, courses, programs, program_courses, and applications.

## Quick Start (PostgreSQL)

1) Create a database (example `learn4sudan`), then run the schema:

```powershell
# From this folder or adjust the path to schema.sql
$env:PGPASSWORD = "<your_password>"
psql -h <host> -U <user> -d <db_name> -f "schema.sql"
```

2) (Optional) Render ERD.mmd using any Mermaid renderer or VS Code Mermaid preview.

## Core Entities

- Users: learner/admin accounts (email-unique; status)
- Roles: role names; `user_roles` maps many-to-many
- Categories: taxonomy for courses
- Courses: basic course metadata (linked to category)
- Programs: scholarship offerings with capacity, lifecycle status, application window
- Program Courses: many-to-many map of courses into a program (+ required/sequence)
- Applications: user applications to programs with a simple review status

## Notes & Conventions

- All PKs are `BIGSERIAL` for simplicity. Switch to UUIDs if preferred.
- Status columns use `CHECK` constraints to enforce allowed values.
- Foreign keys use `ON DELETE` policies chosen for sensible lifecycle behavior.
- Helpful indexes added for common lookups (status, category, user/program FKs).

## Next Steps

- If you plan API development, consider generating models via an ORM (Prisma, Sequelize, SQLAlchemy, etc.).
- Add seed data scripts as needed (base roles, example program, categories).
- Extend later with providers, enrollments, certificates, cohorts, or orgs if/when needed.
-- Simplified PostgreSQL schema for learn4Sudan (core only)
-- Core entities: users, roles, user_roles, categories, courses, programs, program_courses, applications

-- Optional: enable extensions if you prefer UUIDs
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles
CREATE TABLEs
IF NOT EXISTS roles
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- Users
CREATE TABLE
IF NOT EXISTS users
(
    id             BIGSERIAL PRIMARY KEY,
    email          TEXT NOT NULL UNIQUE,
    password_hash  TEXT,
    first_name     TEXT,
    last_name      TEXT,
    status         TEXT NOT NULL DEFAULT 'active' CHECK
(status IN
('active','inactive','blocked')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now
(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- Users ↔ Roles (many-to-many)
CREATE TABLE
IF NOT EXISTS user_roles
(
    user_id     BIGINT NOT NULL REFERENCES users
(id) ON
DELETE CASCADE,
    role_id     BIGINT
NOT NULL REFERENCES roles
(id) ON
DELETE RESTRICT,
    assigned_at TIMESTAMPTZ
NOT NULL DEFAULT now
(),
    PRIMARY KEY
(user_id, role_id)
);

-- Categories
CREATE TABLE
IF NOT EXISTS categories
(
    id         BIGSERIAL PRIMARY KEY,
    name       TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- Courses (no provider dependency for now)
CREATE TABLE
IF NOT EXISTS courses
(
    id                BIGSERIAL PRIMARY KEY,
    title             TEXT NOT NULL,
    short_description TEXT,
    url               TEXT,
    level             TEXT CHECK
(level IN
('beginner','intermediate','advanced','mixed')),
    language          TEXT,
    hours             INTEGER CHECK
(hours IS NULL OR hours >= 0),
    rating            NUMERIC
(3,2) CHECK
(rating IS NULL OR
(rating >= 0 AND rating <= 5)),
    category_id       BIGINT REFERENCES categories
(id) ON
DELETE
SET NULL
,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- Programs (e.g., Coursera scholarship)
CREATE TABLE
IF NOT EXISTS programs
(
    id                   BIGSERIAL PRIMARY KEY,
    name                 TEXT NOT NULL UNIQUE,
    description          TEXT,
    capacity             INTEGER CHECK
(capacity IS NULL OR capacity >= 0),
    status               TEXT NOT NULL DEFAULT 'draft' CHECK
(status IN
('draft','open','closed','in_progress','completed','archived')),
    application_open_at  TIMESTAMPTZ,
    application_close_at TIMESTAMPTZ,
    start_date           DATE,
    end_date             DATE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now
()
);

-- Program ↔ Courses (curated mapping)
CREATE TABLE
IF NOT EXISTS program_courses
(
    program_id  BIGINT NOT NULL REFERENCES programs
(id) ON
DELETE CASCADE,
    course_id   BIGINT
NOT NULL REFERENCES courses
(id) ON
DELETE RESTRICT,
    is_required BOOLEAN
NOT NULL DEFAULT FALSE,
    sequence_no INTEGER,
    PRIMARY KEY
(program_id, course_id)
);

-- Applications (user → program)
CREATE TABLE
IF NOT EXISTS applications
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users
(id) ON
DELETE CASCADE,
    program_id  BIGINT
NOT NULL REFERENCES programs
(id) ON
DELETE CASCADE,
    status      TEXT
NOT NULL DEFAULT 'draft' CHECK
(status IN
('draft','submitted','under_review','accepted','rejected','waitlisted','withdrawn')),
    applied_at  TIMESTAMPTZ NOT NULL DEFAULT now
(),
    UNIQUE
(user_id, program_id)
);

-- Helpful indexes
CREATE INDEX
IF NOT EXISTS idx_users_status ON users
(status);
CREATE INDEX
IF NOT EXISTS idx_programs_status ON programs
(status);
CREATE INDEX
IF NOT EXISTS idx_courses_category ON courses
(category_id);
CREATE INDEX
IF NOT EXISTS idx_applications_program ON applications
(program_id);
CREATE INDEX
IF NOT EXISTS idx_applications_user ON applications
(user_id);

-- Trigger to maintain users.updated_at
CREATE OR REPLACE FUNCTION set_updated_at
()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at
ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE
UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at
();

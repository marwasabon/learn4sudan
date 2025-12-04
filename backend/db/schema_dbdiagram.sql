-- Cleaned SQL compatible with dbdiagram.io (PostgreSQL)
-- Removed IF NOT EXISTS, triggers, and condensed formatting.

CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  first_name TEXT,
  last_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE NO ACTION
);

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  url TEXT,
  level TEXT,
  language TEXT,
  hours INTEGER CHECK (hours IS NULL OR hours >= 0),
  rating NUMERIC(3,2) CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5)),
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  capacity INTEGER CHECK (capacity IS NULL OR capacity >= 0),
  status TEXT NOT NULL DEFAULT 'draft',
  application_open_at TIMESTAMPTZ,
  application_close_at TIMESTAMPTZ,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE program_courses (
  program_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  is_required BOOLEAN NOT NULL DEFAULT FALSE,
  sequence_no INTEGER,
  PRIMARY KEY (program_id, course_id),
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE NO ACTION
);

CREATE TABLE applications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  program_id BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, program_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

-- Indexes (optional for dbdiagram; kept simple)
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_applications_program ON applications(program_id);
CREATE INDEX idx_applications_user ON applications(user_id);

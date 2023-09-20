CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  hosts JSON NOT NULL,  -- This line defines the "hosts" column
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
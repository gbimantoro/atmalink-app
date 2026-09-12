-- 0001_initial_schema.sql
CREATE TABLE IF NOT EXISTS alumni (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nim TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  grad_year INTEGER,
  faculty TEXT,
  major TEXT,
  avatar_url TEXT,
  consent_contacts INTEGER DEFAULT 0,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free','atma_key')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_alumni_grad_year ON alumni(grad_year);
CREATE INDEX idx_alumni_faculty ON alumni(faculty);
CREATE INDEX idx_alumni_tier ON alumni(membership_tier);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL REFERENCES alumni(id),
  title TEXT NOT NULL,
  body TEXT,
  media_json TEXT, -- JSON array of R2 keys
  tags_json TEXT,  -- JSON array
  visibility TEXT DEFAULT 'alumni' CHECK (visibility IN ('public','alumni')),
  published_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_posts_published ON posts(published_at DESC);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizer_id INTEGER NOT NULL REFERENCES alumni(id),
  title TEXT NOT NULL,
  description TEXT,
  start_at TEXT NOT NULL,
  end_at TEXT,
  location TEXT,
  cover_url TEXT,
  rsvp_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_events_start ON events(start_at);

CREATE TABLE IF NOT EXISTS event_rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  alumni_id INTEGER NOT NULL REFERENCES alumni(id) ON DELETE CASCADE,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(event_id, alumni_id)
);

CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_url TEXT,
  verified INTEGER DEFAULT 0,
  mou_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','verified','published','closed')),
  posted_at TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_company ON jobs(company_id);

CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  goal_amount INTEGER DEFAULT 0,
  collected_amount INTEGER DEFAULT 0,
  banner_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  donor_id INTEGER NOT NULL REFERENCES alumni(id),
  campaign_id INTEGER NOT NULL REFERENCES campaigns(id),
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded')),
  payment_ref TEXT,
  paid_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  placement TEXT DEFAULT 'home' CHECK (placement IN ('home','feed','event','job')),
  priority INTEGER DEFAULT 0,
  start_at TEXT,
  end_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chat_rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT DEFAULT 'direct' CHECK (type IN ('direct','group')),
  name TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chat_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  alumni_id INTEGER NOT NULL REFERENCES alumni(id) ON DELETE CASCADE,
  joined_at TEXT DEFAULT (datetime('now')),
  UNIQUE(room_id, alumni_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id INTEGER NOT NULL REFERENCES alumni(id),
  content TEXT,
  media_json TEXT,
  sent_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_messages_room_time ON messages(room_id, sent_at DESC);

CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES alumni(id),
  event_name TEXT NOT NULL,
  props_json TEXT,
  ts TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_analytics_event_name_ts ON analytics_events(event_name, ts);
-- D1 database: hautoo
-- Access codes for gated private media (hash only, never plaintext).

CREATE TABLE member_media_access (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code_hash TEXT NOT NULL UNIQUE,
  -- Comma-separated patterns: * | *.mp4 | videos/foo.mp4 | a.mp4,b.pdf
  content TEXT NOT NULL DEFAULT '*',
  label TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE INDEX idx_member_media_access_hash ON member_media_access (code_hash);
CREATE INDEX idx_member_media_access_active ON member_media_access (active);

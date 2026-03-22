-- Chyess Database -- Tables Creation Script

-- Drop tables if exist (clean recreation)
DROP TABLE IF EXISTS Match;
DROP TABLE IF EXISTS User;


-- Table: User
-- Description: Stores player information and match stats
CREATE TABLE User (
  player_id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  draws INTEGER DEFAULT 0,
  win INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,

  -- Constraint to ensure non-negative stats
  CHECK (draws >= 0),
  CHECK (win >= 0),
  CHECK (losses >= 0)
);


-- Table: Match
-- Description: Stores information on match history and who played
CREATE TABLE Match (
  match_id TEXT PRIMARY KEY NOT NULL,
  white_player_id TEXT NOT NULL,
  black_player_id TEXT NOT NULL,
  time_started DATETIME DEFAULT CURRENT_TIMESTAMP,
  move_history TEXT,
  result TEXT,

  FOREIGN KEY (white_player_id) REFERENCES User(player_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (black_player_id) REFERENCES USER(player_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,

  -- To make sure both players aren't the same one
  CHECK (white_player_id != black_player_id),
  CHECK (result IN ('white_wins', 'black_wins', 'draw', NULL))
);


-- Indexes for better querying
CREATE INDEX idx_match_white_player ON Match(white_player_id);
CREATE INDEX idx_match_black_player ON Match(black_player_id);
CREATE INDEX idx_match_time_started ON Match(time_started);
CREATE INDEX idx_user_email ON User(email);


-- Testing: (WORKS!)
-- AI Generated sample users 
INSERT INTO User (player_id, name, email, draws, win, losses) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Alice Johnson', 'alice@example.com', 5, 12, 3),
    ('550e8400-e29b-41d4-a716-446655440002', 'Bob Smith', 'bob@example.com', 5, 8, 7);

-- Sample match
INSERT INTO Match (match_id, white_player_id, black_player_id, time_started, move_history, result) VALUES
    ('660e8400-e29b-41d4-a716-446655440003', 
     '550e8400-e29b-41d4-a716-446655440001', 
     '550e8400-e29b-41d4-a716-446655440002', 
     '2026-03-23 14:30:00', 
     '[{"move":"e4","player":"white"},{"move":"e5","player":"black"}]', 
     'white_wins');
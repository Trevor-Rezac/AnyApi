-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT NOT NULL
);

INSERT INTO
  songs (title, artist, album)
VALUES
  ('Cant Stop', 'Red Hot Chili Peppers', 'By The Way'),
  ('Welcome Home', 'Coheed and Cambria', 'Good Apollo vol.1');
  
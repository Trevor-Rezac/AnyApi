const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `INSERT INTO
      songs(title, artist, album)
    VALUES($1, $2, $3)
    RETURNING
      *;`,
    [req.body.title, req.body.artist, req.body.album]
  );
  const newSong = new Song(rows[0]);
  res.send(newSong);
});

const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');
const { getAllSongs } = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const newSong = new Song(req.body);
    res.send(newSong);
  })

  .get('/', async (req, res) => {
    const songs = await getAllSongs();
    res.send(songs);
  })

  .get('/:id', async (req, res) => {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        songs
      WHERE
        id=$1;
      `,
      [req.params.id]
    );

    if (!rows[0]) return null;
    const song = new Song(rows[0]);

    res.send(song);
  });

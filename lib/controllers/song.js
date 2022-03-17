const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const newSong = new Song(req.body);
    res.send(newSong);
  })

  .get('/', async (req, res) => {
    const { rows } = await pool.query(`
      SELECT
        *
      FROM
        songs;`);
    const song = rows.map((row) => new Song(row));
    res.send(song);
  });

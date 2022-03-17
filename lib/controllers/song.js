const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const newSong = new Song(req.body);
    res.send(newSong);
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAllSongs();
    res.send(songs);
  })

  .get('/:id', async (req, res) => {
    const song = await Song.getSongById(req.params.id);

    res.send(song);
  })

  .delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
      `DELETE FROM 
        songs 
      WHERE 
        id=$1 
      RETURNING 
        *;`,
      [req.params.id]
    );

    if (!rows[0]) return null;
    const song = new Song(rows[0]);
    res.send(song);
  });

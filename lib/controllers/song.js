const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');
const { getAllSongs, getSongById } = require('../models/Song');

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
    const song = await getSongById(req.params.id);

    res.send(song);
  });

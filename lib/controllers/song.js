const { Router } = require('express');
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
    const song = await Song.deleteSongById(req.params.id);
    res.send(song);
  })

  .patch('/:id', async (req, res) => {
    const newSong = await Song.updateSongById(req.params.id, req.body);

    res.send(newSong);
  });

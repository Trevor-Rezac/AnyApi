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
    const song = await Song.deleteSongById(req.params.id);
    res.send(song);
  })

  .patch('/:id', async (req, res) => {
    const currentSong = await Song.getSongById(req.params.id);

    if (!currentSong) return null;
    const newTitle = req.body.title ?? currentSong.title;
    const newArtist = req.body.artist ?? currentSong.artist;
    const newAlbum = req.body.album ?? currentSong.album;

    const { rows } = await pool.query(
      `
    UPDATE
      songs
    SET
      title=$2, artist=$3, album=$4
    WHERE
      id=$1
    RETURNING
      *
    `,
      [req.params.id, newTitle, newArtist, newAlbum]
    );
    const newSong = new Song(rows[0]);

    res.send(newSong);
  });

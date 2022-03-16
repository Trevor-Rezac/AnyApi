const { Router } = require('express');
const pool = require('../utils/pool');
const Song = require('../models/Song');

module.exports = Router().post('/', async (req, res) => {
  const newSong = new Song(req.body);
  res.send(newSong);
});

const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const newSong = { id: '1', ...req.body };
  res.send(newSong);
});

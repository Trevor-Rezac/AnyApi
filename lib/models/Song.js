const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;
  album;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.album = row.album;
  }

  static async create({ title, artist, album }) {
    const { rows } = await pool.query(
      `INSERT INTO
        songs(title, artist, album)
      VALUES($1, $2, $3)
      RETURNING
        *;`,
      [title, artist, album]
    );

    const song = new Song(rows[0]);
    return song;
  }
};

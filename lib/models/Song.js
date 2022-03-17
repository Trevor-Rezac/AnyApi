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

  static async getAllSongs() {
    const { rows } = await pool.query(`
      SELECT
        *
      FROM
        songs;`);
    const songs = rows.map((row) => new Song(row));
    return songs;
  }

  static async getSongById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        songs
      WHERE
        id=$1;
      `,
      [id]
    );

    if (!rows[0]) return null;
    const song = new Song(rows[0]);
    return song;
  }

  static async deleteSongById(id) {
    const { rows } = await pool.query(
      `DELETE FROM 
        songs 
      WHERE 
        id=$1 
      RETURNING 
        *;`,
      [id]
    );

    if (!rows[0]) return null;
    const song = new Song(rows[0]);
    return song;
  }

  static async updateSongById(id, { title, artist, album }) {
    const currentSong = await Song.getSongById(id);

    if (!currentSong) return null;
    const newTitle = title ?? currentSong.title;
    const newArtist = artist ?? currentSong.artist;
    const newAlbum = album ?? currentSong.album;

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
      [id, newTitle, newArtist, newAlbum]
    );
    const newSong = new Song(rows[0]);
    return newSong;
  }
};

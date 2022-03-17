const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('AnyApi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a song', async () => {
    const results = await request(app).post('/api/v1/songs').send({
      id: '1',
      title: 'Poster Child',
      artist: 'Red Hot Chili Peppers',
      album: 'Unlimited Love',
    });

    expect(results.body).toEqual({
      id: expect.any(String),
      title: 'Poster Child',
      artist: 'Red Hot Chili Peppers',
      album: 'Unlimited Love',
    });
  });

  it('should be able to list all songs', async () => {
    await Song.create({
      title: 'Poster Child',
      artist: 'Red Hot Chili Peppers',
      album: 'Unlimited Love',
    });

    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'Poster Child',
        artist: 'Red Hot Chili Peppers',
        album: 'Unlimited Love',
      },
    ]);
  });

  it('should get a song by id', async () => {
    const song = await Song.create({
      title: 'Dont Stop Believing',
      artist: 'Journey',
      album: 'Escape',
    });

    const res = await request(app).get(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

  it('should delete a song by Id', async () => {
    const song = await Song.create({
      title: 'Sunshine',
      artist: 'Atmosphere',
      album: 'Sad Clown Bad Year',
    });
    const res = await request(app).delete(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
    expect(await Song.getSongById(song.id)).toBeNull();
  });
});

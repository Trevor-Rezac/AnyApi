const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('AnyApi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a song', async () => {
    const results = await request(app).post('/api/v1/songs').send({
      title: 'Welcome Home',
      artist: 'Coheed and Cambira',
      album: 'Good Apollo vol.1',
    });

    expect(results.body).toEqual({
      id: expect.any(String),
      title: 'Welcome Home',
      artist: 'Coheed and Cambira',
      album: 'Good Apollo vol.1',
    });
  });
});

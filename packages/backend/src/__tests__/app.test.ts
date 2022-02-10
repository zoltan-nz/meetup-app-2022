import request from 'supertest';
import { movies } from '../__mocks__/mock-movies';
import app from '../app';

describe('Run the application', () => {
  it('should run the application', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return a list of movies', async () => {
    const response = await request(app).get('/api/v1/movies');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies,
    });
  });
});

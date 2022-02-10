import express, { Request, Response } from 'express';
import { movies } from './__mocks__/mock-movies';
import { MoviesPayload } from './models/movie';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/api/v1/movies', (req: Request, res: Response<MoviesPayload>) => {
  res.send({ movies });
});

export default app;

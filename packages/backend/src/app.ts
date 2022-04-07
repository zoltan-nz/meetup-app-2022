import express, { Request, Response } from 'express';
import { movies } from './__mocks__/mock-movies';
import { MoviesPayload } from './models/movie';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/api/v1/movies', (req: Request, res: Response<MoviesPayload>) => {
  res.send({ movies });
});

app.delete('/api/v1/movies/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === Number(id));
  if (!movie) {
    res.status(404).send({ message: 'Movie not found' });
  } else {
    movies.splice(movies.indexOf(movie), 1);
    res.send({ message: 'Movie deleted' });
  }
});

app.put('/api/v1/movies/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const movie = movies.find((movie) => movie.id === Number(id));
  if (!movie) {
    res.status(404).send({ message: 'Movie not found' });
  } else {
    movie.title = title;
    res.send({ message: 'Movie updated' });
  }
});
export default app;

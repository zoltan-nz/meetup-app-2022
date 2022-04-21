import express, { json, NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { movies } from './__mocks__/mock-movies';
import { CreateMovieRequestPayload, CreateMovieResponsePayload, Movie, MoviesPayload } from './models/movie';

const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/api/v1/movies', (req: Request, res: Response<MoviesPayload>) => {
  res.send({ movies });
});

app.post(
  '/api/v1/movies',
  (
    req: Request<{}, {}, CreateMovieRequestPayload>,
    res: Response<CreateMovieResponsePayload | { message: string }>,
    next: NextFunction
  ) => {
    const { movie } = req.body;
    if (!movie) {
      return res.status(400).json({ message: 'Movie is required' });
    }

    if (!movie.title) {
      return res.status(400).json({ message: 'Movie title is required' });
    }

    const newMovie: Movie = {
      id: v4(),
      title: movie.title,
    };

    movies.push(newMovie);
    res.status(201).json({ movie: newMovie });
  }
);

app.delete('/api/v1/movies/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    res.status(404).send({ message: 'Movie not found' });
  } else {
    movies.splice(movies.indexOf(movie), 1);
    res.send({ message: 'Movie deleted' });
  }
});

app.get('/api/v1/movies/:movieId/actors/:actorId', (req: Request<{ id: string }>, res: Response) => {
  console.log(req.params);
});

export default app;

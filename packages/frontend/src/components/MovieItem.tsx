import { FC } from 'react';
import { Movie } from '../movie';

interface MovieItemProps {
  movie: Movie;
  deleteMovie: (id: string) => any;
}

const MovieItem: FC<MovieItemProps> = ({ movie, deleteMovie }) => {
  return (
    <li key={movie.id}>
      {movie.id} - <span>{movie.title}</span>
      <button onClick={() => deleteMovie(movie.id)}>Delete</button>
    </li>
  );
};

export { MovieItem };

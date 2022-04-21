import { FC } from 'react';
import { Movie } from '../movie';

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: FC<MovieItemProps> = ({ movie }) => {
  return (
    <li key={movie.id}>
      {movie.id} - <span>{movie.title}</span>
      <button onClick={() => {}}>Delete</button>
    </li>
  );
};

export { MovieItem };

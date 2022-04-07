import { v4 } from 'uuid';
import { Movie } from '../models/movie';

export const movies: Movie[] = [
  {
    id: v4(),
    title: 'The Shawshank Redemption',
  },
  {
    id: v4(),
    title: 'The Godfather',
  },
];

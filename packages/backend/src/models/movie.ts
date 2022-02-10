export interface Movie {
  id: number;
  title: string;
}

export interface MoviesPayload {
  movies: Movie[];
}

export interface Movie {
  id: string;
  title: string;
}

export interface MoviesPayload {
  movies: Movie[];
}

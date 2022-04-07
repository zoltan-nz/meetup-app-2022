export interface Movie {
  id: string;
  title: string;
}

export interface MoviesPayload {
  movies: Movie[];
}

export interface CreateMovieResponsePayload {
  movie: Movie;
}

export interface CreateMovieRequestPayload {
  movie: Partial<Movie>;
}

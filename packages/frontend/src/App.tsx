import axios from 'axios';
import { useEffect, useState } from 'react';
import { Movie, MoviesPayload } from './movie';

const findAllMovies = async () => {
  const response = await axios.get<MoviesPayload>('/api/v1/movies');
  return response.data.movies;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    findAllMovies().then((list) => setMovies(list));
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
        </div>
      ))}
    </>
  );
}

export default App;

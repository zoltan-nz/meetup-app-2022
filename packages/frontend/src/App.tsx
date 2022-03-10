import { useGetMoviesQuery } from './app/services/movies';

function App() {
  const { data, error, isLoading } = useGetMoviesQuery();

  return (
    <>
      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && data.movies && (
        <ul>
          {data.movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

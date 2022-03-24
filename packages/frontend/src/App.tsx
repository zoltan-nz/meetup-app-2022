import { useDeleteMovieMutation, useGetMoviesQuery } from './app/services/movies';

function App() {
  const { data, error, isLoading } = useGetMoviesQuery();
  const [deleteMovie, { isLoading: isDeleting, data: deleteData, isSuccess: deleteSuccess }] = useDeleteMovieMutation();

  return (
    <>
      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && data.movies && (
        <ul>
          {data.movies.map((movie) => (
            <li key={movie.id}>
              {movie.title}
              <button
                onClick={() => {
                  deleteMovie(movie.id).then((result) => {
                    console.log(result);
                    console.log(deleteData);
                    console.log(deleteSuccess);
                  });
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {isDeleting && <p>Deleting...</p>}
    </>
  );
}

export default App;

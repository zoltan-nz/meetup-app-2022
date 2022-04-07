import { useState } from 'react';
import { useDeleteMovieMutation, useGetMoviesQuery, useUpdateMovieMutation } from './app/services/movies';
import { Movie } from './movie';

const MovieForm = ({ movie }: { movie: Movie }) => {
  const [movieTitle, setMovieTitle] = useState(movie.title);

  const [deleteMovie, { isLoading: isDeleting, data: deleteData, isSuccess: deleteSuccess }] = useDeleteMovieMutation();
  const [updateMovie, { isLoading: isUpdting, data: updateData, isSuccess: updateSuccess }] = useUpdateMovieMutation();

  const saveChanges = () => {
    updateMovie({ ...movie, title: movieTitle }).then((result) => {
      console.log(result);
      console.log(updateData);
      console.log(updateSuccess);
    });
  };

  return (
    <>
      <input type="text" value={movieTitle} onChange={(evt) => setMovieTitle(evt.target.value)} />
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
      <button onClick={saveChanges}>Save Changes</button>
      {isDeleting && <p>Deleting...</p>}
      {isUpdting && <p>Updating...</p>}
    </>
  );
};

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
            <li key={movie.id}>
              <MovieForm movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;

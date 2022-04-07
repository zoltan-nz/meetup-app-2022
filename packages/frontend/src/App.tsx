import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useCreateMovieMutation, useDeleteMovieMutation, useGetMoviesQuery } from './app/services/movies';

function App() {
  const [title, setTitle] = useState('');

  const { data, error, isLoading } = useGetMoviesQuery();
  const [deleteMovie, { isLoading: isDeleting, data: deleteData, isSuccess: deleteSuccess }] = useDeleteMovieMutation();
  const [createMovie, { isLoading: isCreating, data: createData, error: createError, isSuccess: createSuccess }] =
    useCreateMovieMutation();

  useEffect(() => {
    if (createSuccess) {
      setTitle('');
    }
  }, [createSuccess]);

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    await createMovie({ title });
  };

  return (
    <>
      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && data.movies && (
        <ul>
          {data.movies.map((movie) => (
            <li key={movie.id}>
              {movie.id} - {movie.title}
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
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {isCreating && <p>Creating...</p>}
      {createError && <p>Error :(</p>}

      {isDeleting && <p>Deleting...</p>}
    </>
  );
}

export default App;

import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { movieApi } from './app/services/movies';
import { MovieItem } from './components/MovieItem';

function App() {
  const [title, setTitle] = useState('');
  const [validationError, setValidationError] = useState('');

  const { data, error, isLoading } = movieApi.useGetMoviesQuery();
  const [deleteMovie, { isLoading: isDeleting, data: deleteData, isSuccess: deleteSuccess }] =
    movieApi.useDeleteMovieMutation();
  const [createMovie, { isLoading: isCreating, data: createData, error: createError, isSuccess: createSuccess }] =
    movieApi.useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdating, data: updateData, error: updateError, isSuccess: updateSuccess }] =
    movieApi.useUpdateMovieMutation();

  useEffect(() => {
    if (createSuccess) {
      setTitle('');
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      setValidationError('something wrong');
    }
  }, [createError]);

  const onSubmit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();

    await createMovie({ title });
  };

  return (
    <>
      <h1>Movies</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      {data && data.movies && <ul>{data.movies.map((movie) => MovieItem({ movie, deleteMovie }))}</ul>}
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {isCreating && <p>Creating...</p>}
      {createError && <p>Error :( </p>}

      {isDeleting && <p>Deleting...</p>}
    </>
  );
}

export default App;

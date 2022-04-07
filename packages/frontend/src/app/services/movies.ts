import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MoviesPayload } from '../../movie';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Movie'],
  endpoints: (build) => ({
    getMovies: build.query<MoviesPayload, void>({
      query: () => '/movies',
      providesTags: (result) =>
        result
          ? [...result.movies.map(({ id }) => ({ type: 'Movie', id } as const)), { type: 'Movie', id: 'LIST' }]
          : [{ type: 'Movie', id: 'LIST' }],
    }),
    getMovie: build.query<{ id: number }, Movie>({
      query: ({ id }) => `/movies/${id}`,
      providesTags: (result) => [{ type: 'Movie', id: result?.id }],
    }),
    deleteMovie: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/movies/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Movie', id }],
    }),
    createMovie: build.mutation<{ success: boolean; movie: Movie }, Partial<Movie>>({
      query(movie) {
        return {
          url: '/movies',
          method: 'POST',
          body: { movie },
        };
      },
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
    }),
    updateMovie: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/movies/${id}`,
          method: 'PUT',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Movie', id }],
    }),
  }),
});

export const { useGetMoviesQuery, useDeleteMovieMutation, useUpdateMovieMutation, useCreateMovieMutation } = movieApi;

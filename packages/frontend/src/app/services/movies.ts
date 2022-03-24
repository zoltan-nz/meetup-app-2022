import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MoviesPayload } from '../../movie';

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
    deleteMovie: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/movies/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Movie', id }],
    }),
  }),
});

export const { useGetMoviesQuery, useDeleteMovieMutation } = movieApi;

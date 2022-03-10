import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MoviesPayload } from '../../movie';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (build) => ({
    getMovies: build.query<MoviesPayload, void>({
      query: () => '/movies',
    }),
  }),
});

export const { useGetMoviesQuery } = movieApi;

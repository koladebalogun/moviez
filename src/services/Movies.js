import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apikey = process.env.REACT_APP_MOVIES_KEY;
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${apikey}`;
        }

        if (genreOrCategoryName && typeof genreOrCategoryName === "string") {
          return `movie/${genreOrCategoryName}?page=${page}&api_key=${apikey}`;
        }

        if (genreOrCategoryName && typeof genreOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${apikey}`;
        }

        return `movie/popular?page=${page}&api_key=${apikey}`;
      },
    }),

    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${apikey}`,
    }),

    // get genres
    getGenre: builder.query({
      query: () => `genre/movie/list?api_key=${apikey}`,
    }),

    getRecommendation: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${apikey}`,
    }),

    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${apikey}`,
    }),

    getMoviesByActor: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${apikey}`,
    }),

    getFavorites: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?api_key=${apikey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenreQuery,
  useGetMovieQuery,
  useGetRecommendationQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorQuery,
  useGetFavoritesQuery,
} = movieApi;

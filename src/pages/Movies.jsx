import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, CircularProgress, Typography } from '@mui/material';
import { useGetMoviesQuery } from '../services/Movies';
import MovieList from '../components/MovieList/MovieList';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import Pagination from '../components/Pagination/Pagination';
import FeaturedMovie from '../components/FeaturedMovie/FeaturedMovie';

const Movies = () => {
  const [page, setPage] = useState(1);
  const {genreOrCategoryName, searchQuery} = useSelector((state) => state.currentGenreOrCategory)
  const {data, error, isFetching} = useGetMoviesQuery({genreOrCategoryName, page, searchQuery});
  const numberOfMovies = 17

  if(isFetching){
    return (
      <Box display="flex" justifyContent="center">
          <CircularProgress size="4rem"/>
      </Box>
    );
  };

  if(!data.results.length){
    return (
      <Box display="flex" justifyContent="center" mt="20px">
          <Typography variant='h4'>No Movies to display</Typography>
      </Box>
    );
  };

  if(error) return 'An error has ocurred';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
}

export default Movies
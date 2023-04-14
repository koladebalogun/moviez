import React from 'react';
import { Grid } from '@mui/material';
import useStyles from "./styles";
import Movie from '../Movie/Movie';


const MovieList = ({movies, numberOfMovies, excludeFirst}) => {
  const classes = useStyles();

  const startFrom = excludeFirst ? 1 : 0 //this is so that if a movie is shown on the featuredcard, it won't show on the movie list

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i}/>
      ))}
    </Grid>
  )
}

export default MovieList
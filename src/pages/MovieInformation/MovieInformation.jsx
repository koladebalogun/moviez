import React, { useState, useEffect } from "react";
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from "@mui/material";
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from "@mui/icons-material";
import MovieList from "../../components/MovieList/MovieList";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useGetFavoritesQuery, useGetMovieQuery, useGetRecommendationQuery } from "../../services/Movies";
import { userSelector } from "../../features/auth";
import useStyles from "./styles";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const MovieInformation = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { user } = useSelector(userSelector);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendation, isFetching: loading } =
    useGetRecommendationQuery({ movie_id: id, list: "/recommendations" });
  const dispatch = useDispatch();

  const {data:favoriteMovies} = useGetFavoritesQuery({listName:'/favorite/movies', accountId: user.id, sessionId:localStorage.getItem("session_id"), page:1})
  const {data:watchlistMovies} = useGetFavoritesQuery({listName:'/watchlist/movies', accountId: user.id, sessionId:localStorage.getItem("session_id"), page:1})

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?. id === data?.id))
  },[favoriteMovies, data])

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?. id === data?.id))
  },[watchlistMovies, data])


  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> Something has gone wrong, go back</Link>
      </Box>
    );
  }


  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_MOVIES_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_MOVIES_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          className={classes.poster}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average}
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genreContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              clasnam={classes.link}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
              key={genre.name}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt=""
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
        Overview
      </Typography>
      <Typography style={{ marginBottom: "2rem" }}>{data?.overview}</Typography>
      <Typography variant="h5" gutterBottom>
        Top Cast
      </Typography>
      <Grid item container spacing={2}>
        {data &&
          data?.credits?.cast
            ?.map((character, i) => (
              <Grid
                item
                xs={4}
                md={2}
                component={Link}
                key={i}
                to={`/actors/${character.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                  className={classes.castImage}
                />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">
                  {character.character.split("/")[0]}
                </Typography>
              </Grid>
            ))
            .slice(0, 6)}
      </Grid>
      <Grid item container style={{ marginTop: "2rem" }}>
        <div className={classes.buttonContainer}>
          <Grid item xs={12} sm={6} className={classes.buttonContainer}>
            <ButtonGroup size="small" variant="outlined">
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={data?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${data?.imdb_id}`}
                endIcon={<MovieIcon />}
              >
                Imdb
              </Button>
              <Button
                href="#"
                endIcon={<Theaters />}
                onClick={() => setOpen(true)}
              >
                Trailer
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.buttonContainer}>
            <ButtonGroup size="small" variant="outlined">
              <Button
                onClick={addToFavorites}
                endIcon={
                  isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                }
              >
                {isMovieFavorited ? "Unfavorite" : "Favorite"}
              </Button>

              <Button
                onClick={addToWatchlist}
                endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
              >
                {isMovieWatchlisted ? "Remove from watchlist" : "Watchlist"}
              </Button>

              <Button
                sx={{ borderColor: "primary.main" }}
                endIcon={<ArrowBack />}
              >
                <Typography
                  style={{ textDecoration: "none" }}
                  component={Link}
                  to="/"
                  color="inherit"
                  variant="subtitle2"
                >
                  Back
                </Typography>
              </Button>
            </ButtonGroup>
          </Grid>
        </div>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {recommendation ? (
          <MovieList movies={recommendation} numberofMovies={12} />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.videos}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
            frameborder="0"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

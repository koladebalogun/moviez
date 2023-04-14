import React, { useState } from "react";
import { Typography, Button, Grid, Box, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./styles";
import {useGetActorsDetailsQuery,useGetMoviesByActorQuery} from "../../services/Movies";
import MovieList from '../../components/MovieList/MovieList'
import Pagination from "../../components/Pagination/Pagination";

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: actors } = useGetMoviesByActorQuery({ id, page });

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
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          color="primary"
        >
          {" "}
          No actors found, go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
            className={classes.image}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5">
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry no biography yet."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/")}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>
          Movies
        </Typography>
        {actors && <MovieList movies={actors} numberOfMovies={12}/>}
        <Pagination currentPage={page} setPage={setPage} totalPages={actors?.total_pages}/>
      </Box>
    </>
  );
};

export default Actors;

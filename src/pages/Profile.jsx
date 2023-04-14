import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { userSelector } from "../features/auth";
import { useGetFavoritesQuery } from "../services/Movies";
import RatedCards from "../components/RatedCards/RatedCards";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const {data:favoriteMovies, refetch: refetchFavorites} = useGetFavoritesQuery({listName:'/favorite/movies', accountId: user.id, sessionId:localStorage.getItem("session_id"), page:1})
  const {data:watchlistMovies, refetch: refetchWatchlist} = useGetFavoritesQuery({listName:'/watchlist/movies', accountId: user.id, sessionId:localStorage.getItem("session_id"), page:1})


  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  },[])

  
  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorite movies or watchlist your movies to see them here.
        </Typography>
      ): (
        <Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies}/>
          <RatedCards title='Watchlist Movies' data={watchlistMovies} style={{marginTop:'30px'}}/>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

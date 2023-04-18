import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInformation, Movies, Profile } from './pages';
import NavBar from './components/Navbar/NavBar';
import useStyles from './style';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/movie/:id" element={<MovieInformation />} />

          <Route path="/actors/:id" element={<Actors />} />

          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

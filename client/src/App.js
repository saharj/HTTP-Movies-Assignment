import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import AddMovie from "./Movies/AddMovie";
import UpdateMovie from "./Movies/UpdateMovie";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route exact path="/add-movie" component={AddMovie}></Route>
      {/* <Route path="/update-movie/:id" component={UpdateMovie}></Route> */}
      <Route
        exact
        path="/update-movie/:id"
        render={(props) => (
          <AddMovie
            {...props}
            setMovieList={setMovieList}
            movieList={movieList}
          />
        )}
      />

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
};

export default App;

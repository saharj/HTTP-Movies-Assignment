import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AddMovie(props) {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const params = useParams();

  useEffect(() => {
    if (props && props.movieList) {
      const movie = props.movieList.filter(
        (movie) => parseInt(movie.id) === parseInt(params.id)
      );

      if (movie.length) {
        setNewMovie({
          ...newMovie,
          title: movie[0].title,
          director: movie[0].director,
          metascore: parseInt(movie[0].metascore),
          stars: movie[0].stars,
        });
      }
    }
  }, [props]);

  const onInputChange = (e) => {
    if (e.target.name === "stars") {
      const starsList = e.target.value.split(",");
      setNewMovie({
        ...newMovie,
        stars: starsList,
      });
    } else if (e.target.name === "metascore") {
      setNewMovie({
        ...newMovie,
        metascore: parseInt(e.target.value),
      });
    } else {
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitMovie = (e) => {
    e.preventDefault();
    if (props && props.movieList) {
      const id = parseInt(params.id);
      const data = newMovie;
      data.id = id;
      axios
        .put(`http://localhost:5000/api/movies/${id}`, data)
        .then((res) => console.log(res));
    } else {
    }
  };

  return (
    <div>
      <form onSubmit={submitMovie}>
        <label>
          Title:
          <input
            name="title"
            type="string"
            value={newMovie.title}
            onChange={onInputChange}
          />
        </label>
        <label>
          Director:
          <input
            name="director"
            type="string"
            value={newMovie.director}
            onChange={onInputChange}
          />
        </label>
        <label>
          Metascore:
          <input
            name="metascore"
            type="string"
            value={newMovie.metascore}
            onChange={onInputChange}
          />
        </label>
        <label>
          stars:
          <input
            name="stars"
            type="string"
            value={newMovie.stars}
            onChange={onInputChange}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddMovie;

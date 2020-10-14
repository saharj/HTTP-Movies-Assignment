import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MovieCard = (props) => {
  const { title, director, metascore, stars } = props.movie;

  const { push } = useHistory();

  const onDelete = (e) => {
    console.log(e.target);
    console.log(props);
    const id = props.movie.id;
    axios.delete(`http://localhost:5000/api/movies/${id}`).then((res) => {
      if (res.statusText === "Accepted") {
        push("/");
      }
    });
  };
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map((star) => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <span onClick={onDelete}>DELETE</span>
    </div>
  );
};

export default MovieCard;

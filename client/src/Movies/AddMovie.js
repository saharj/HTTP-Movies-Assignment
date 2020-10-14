import React, { useState } from "react";

function AddMovie(props) {
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: [],
  });

  const onInputChange = (e) => {
    if (e.target.name === "actors") {
      const actorsList = e.target.value.split(",");
      //   actorsList
    } else {
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div>
      <form>
        <label>
          Title:
          <input name="title" type="string" onChange={onInputChange} />
        </label>
        <label>
          Director:
          <input name="director" type="string" onChange={onInputChange} />
        </label>
        <label>
          Metascore:
          <input name="metascore" type="string" onChange={onInputChange} />
        </label>
        <label>
          Actors:
          <input name="actors" type="string" onChange={onInputChange} />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddMovie;

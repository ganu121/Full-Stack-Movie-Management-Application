import { useState } from "react";

function AddMovie() {
  const [movie, setMovie] = useState({
    name: "",
    genre: "",
    releaseYear: "",
    rating: ""
  });

  // Submit movie to backend
  const addMovie = async () => {
    await fetch("http://localhost:5000/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    });

    alert("Movie added successfully");
    window.location.reload(); // simple refresh
  };

  return (
    <div>
      <h2> Add Movie</h2>

      <input
        placeholder="Movie Name"
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Genre"
        onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
      />
      <br />

      <input
        placeholder="Release Year"
        onChange={(e) => setMovie({ ...movie, releaseYear: e.target.value })}
      />
      <br />

      <input
        placeholder="Rating"
        onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
      />
      <br />

      <button onClick={addMovie}>Add Movie</button>
    </div>
  );
}

export default AddMovie;

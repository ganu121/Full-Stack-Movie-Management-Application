import { useEffect, useState } from "react";

function UpdateMovie({ movieId, onUpdate }) {
  const [movie, setMovie] = useState({
    name: "",
    genre: "",
    releaseYear: "",
    rating: "",
  });

  // GET movie by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  // UPDATE movie
  const updateMovie = async () => {
    await fetch(`http://localhost:5000/api/movies/${movieId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    alert("Movie updated successfully");
    onUpdate();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>✏️ Update Movie</h3>

      <input
        value={movie.name}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      />
      <br />

      <input
        value={movie.genre}
        onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
      />
      <br />

      <input
        value={movie.releaseYear}
        onChange={(e) =>
          setMovie({ ...movie, releaseYear: e.target.value })
        }
      />
      <br />

      <input
        value={movie.rating}
        onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
      />
      <br />

      <button onClick={updateMovie}>Update</button>
    </div>
  );
}

export default UpdateMovie;

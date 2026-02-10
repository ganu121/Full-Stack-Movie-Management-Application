import { useEffect, useState } from "react";
import UpdateMovie from "./UpdateMovie";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // For Get-by-ID feature
  const [searchId, setSearchId] = useState("");
  const [searchedMovie, setSearchedMovie] = useState(null);

  // Fetch all movies
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/api/movies");
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // DELETE movie
  const deleteMovie = async (id) => {
    await fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    });
    fetchMovies();
  };

  // GET movie by ID
  const getMovieById = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/${searchId}`
      );

      if (!res.ok) {
        alert("Movie not found");
        return;
      }

      const data = await res.json();
      setSearchedMovie(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>🎬 Movie List</h2>

      {/* GET MOVIE BY ID */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🔍 Get Movie by ID</h3>
        <input
          placeholder="Enter Movie ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: "300px" }}
        />
        <button onClick={getMovieById} style={{ marginLeft: "10px" }}>
          Get Movie
        </button>

        {searchedMovie && (
          <div style={{ marginTop: "10px" }}>
            <strong>{searchedMovie.name}</strong> |{" "}
            {searchedMovie.genre} | {searchedMovie.releaseYear} | ⭐{" "}
            {searchedMovie.rating}
          </div>
        )}
      </div>

      <hr />

      {/* ALL MOVIES */}
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} style={{ marginBottom: "10px" }}>
          <div>
            <strong>{movie.name}</strong> | {movie.genre} |{" "}
            {movie.releaseYear} | ⭐ {movie.rating}
          </div>

          <div style={{ fontSize: "12px", color: "gray" }}>
            ID: {movie._id}
          </div>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setSelectedMovieId(movie._id)}
          >
            ✏️ Edit
          </button>

          <button
            style={{ marginLeft: "5px" }}
            onClick={() => deleteMovie(movie._id)}
          >
            ❌ Delete
          </button>
        </li>

        ))}
      </ul>

      {/* UPDATE MOVIE */}
      {selectedMovieId && (
        <UpdateMovie
          movieId={selectedMovieId}
          onUpdate={() => {
            setSelectedMovieId(null);
            fetchMovies();
          }}
        />
      )}
    </div>
  );
}

export default MovieList;

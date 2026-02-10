import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Management App</h1>

      {/* Add new movie */}
      <AddMovie />

      <hr />

      {/* Show all movies */}
      <MovieList />
    </div>
  );
}

export default App;

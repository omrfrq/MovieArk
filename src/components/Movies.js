import MovieCard from "./MovieCard";

import { useState } from "react";
function Movies(props) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label
          style={{ paddingTop: "100px", textAlign: "justify" }}
          htmlFor="query"
        >
          Movie Name
        </label>

        <input
          type="text"
          name="query"
          placeholder="i.e Harry Potter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            // pass in movie prop into MovieCard component
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
export default Movies;

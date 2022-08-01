import classes from "./MovieSearch.module.css";
import MovieCard from "./MovieCard";
import { useState } from "react";

function MovieSearch(props) {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");
  const [query4, setQuery4] = useState("");
  const [query5, setQuery5] = useState("");
  const [query6, setQuery6] = useState("");
  const [query7, setQuery7] = useState("");
  const [query8, setQuery8] = useState("");
  const [query9, setQuery9] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const filter_list = {
      1: query1,
      2: query2,
      3: query3,
      4: query4,
      5: query5,
      6: query6,
      7: query7,
      8: query8,
      //9: query9,
    };

    const url = "http://127.0.0.1:5000/fetch"; //`https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${query}&page=1&include_adult=false`;

    if (
      query1 !== "" ||
      query2 !== "" ||
      query3 !== "" ||
      query4 !== "" ||
      query5 !== ""
    ) {
      console.log("submitting");
      console.log(filter_list);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filter_list),
      });

      const data = await res.json();
      console.log(data);
      setMovies(data);
    } else {
      console.log("Enter Any one of the first five fields ");
      alert("Enter Any one of the first five fields");
    }

    //console.log("movies state -->", movies);
  };
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="queryDirector">Director</label>
        <input
          type="text"
          name="queryDirector"
          placeholder="i.e Nolan"
          value={query1}
          onChange={(e) => setQuery1(e.target.value)}
        />
        <label htmlFor="queryWriter">Writer</label>
        <input
          type="text"
          name="queryWriter"
          placeholder="e.g Zack Snyder"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
        />
        <label htmlFor="queryActor">Actor</label>
        <input
          type="text"
          name="queryActor"
          placeholder="e.g Tom cruise"
          value={query3}
          onChange={(e) => setQuery3(e.target.value)}
        />
        <label htmlFor="queryComposer">Composer </label>
        <input
          type="text"
          name="queryComposer"
          placeholder="e.g Hans Zimmer"
          value={query4}
          onChange={(e) => setQuery4(e.target.value)}
        />
        <label htmlFor="queryCinematographer">Cinematographer </label>
        <input
          type="text"
          name="queryCinematographer"
          placeholder="e.g Gadoffi"
          value={query5}
          onChange={(e) => setQuery5(e.target.value)}
        />
        <label htmlFor="queryGenre">Exclude Genre </label>
        <div class={classes.textt}>
          This drop down filter will remove specific movies from selected Genre.
        </div>
        <select
          value={query6 || ""}
          onChange={(e) => setQuery6(e.target.value || null)}
        >
          <option></option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Animation</option>
          <option>Comedy</option>
          <option>Crime</option>
          <option>Documentary</option>
          <option>Drama</option>
          <option>Family</option>
          <option>Fantasy</option>
          <option>History</option>
          <option>Music</option>
          <option>Mystery</option>
          <option>Romance</option>
          <option>Science Fiction</option>
          <option>Thrillere</option>
          <option>War</option>
          <option>Western</option>
        </select>
        <label htmlFor="queryProduction">Production House </label>
        <input
          type="text"
          name="queryProduction"
          placeholder="e.g Warnor bros."
          value={query7}
          onChange={(e) => setQuery7(e.target.value)}
        />
        <label htmlFor="queryProfit"> Profit </label>
        <div class={classes.textt}>
          This drop down filter will search on basis of profit earned by movies
          .
        </div>
        <select
          value={query8 || ""}
          onChange={(e) => setQuery8(e.target.value || null)}
        >
          <option></option>
          <option>250 million $</option>
          <option>500 million $</option>
          <option>1000 million $</option>
          <option>1500 million $</option>
          <option>2000 million $</option>
          <option>3000 million $</option>
        </select>
        <label htmlFor="queryBudget"> Budget </label>
        <div class={classes.textt}>
          This drop down filter will search on basis of starting budget of
          movies .
        </div>
        <select
          value={query9 || ""}
          onChange={(e) => setQuery9(e.target.value || null)}
        >
          <option></option>
          <option>250 million $</option>
          <option>500 million $</option>
          <option>1000 million $</option>
          <option>1500 million $</option>
          <option>2000 million $</option>
          <option>3000 million $</option>
        </select>
        <button className="button" type="submit">
          Search
        </button>
      </form>

      {/* <div className="card-list">
        {movies.map((movie) => (
      
              
          // pass in movie prop into MovieCard component
         // <MovieCard movie={movie} key={movie.poster_path} />
        ))}
      </div> */}

      <div className="card-list">
        {movies.map((movie) => (
          //console.log(movie);
          // pass in movie prop into MovieCard component
          <MovieCard movie={movie} key={movie.poster_path} />
        ))}
      </div>
    </>
  );
}
export default MovieSearch;

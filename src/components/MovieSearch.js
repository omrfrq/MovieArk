import classes from "./MovieSearch.module.css";
import MovieCard from "./MovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { YearRangePicker } from "react-year-range-picker";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { Input } from "@mui/material";
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
  //release years
  const [query10, setQuery10] = useState("");
  const [query11, setQuery11] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const profitChangeHandler = (e) => {
    setQuery8(e.target.value);
    console.log(e.target.value);
  };
  const budgetChangeHandler = (e) => {
    setQuery7(e.target.value);
    console.log(e.target.value);
  };
  const genreHandler = (e) => {
    console.log(e.target.value);
  };

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
      9: query9,
      10: query10,
      11: query11,
    };

    const url = "/fetch"; //`https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${query}&page=1&include_adult=false`;

    if (
      query1 !== "" ||
      query2 !== "" ||
      query3 !== "" ||
      query4 !== "" ||
      query5 !== ""
    ) {
      console.log("submitting");
      console.log(filter_list);
      setLoading(true);

      // alert("Fetching Results.....Plz Wait");

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filter_list),
      });
      // setButtonClicked(true);
      // console.log(buttonClicked);
      const data = await res.json();
      if (data.length === 0) {
        console.log("No Result Found");

        setMovies([]);
        alert("No Movie Found");
      } else {
        console.log(data);
        setMovies(data);
      }
    } else {
      console.log("Enter Any one of the first five fields ");
      alert("Enter Any one of the first five fields");
    }
    setLoading(false);

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
          placeholder="e.g Grieg Fraser"
          value={query5}
          onChange={(e) => setQuery5(e.target.value)}
        />
        <label htmlFor="queryProduction">Production House </label>
        <input
          type="text"
          name="queryProduction"
          placeholder="e.g Warnor bros."
          value={query9}
          onChange={(e) => setQuery9(e.target.value)}
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
          <option value={28}>Action</option>
          <option value={12}>Adventure</option>
          <option value={16}>Animation</option>
          <option value={35}>Comedy</option>
          <option value={80}>Crime</option>
          <option value={99}>Documentary</option>
          <option value={18}>Drama</option>
          <option value={10751}>Family</option>
          <option value={14}>Fantasy</option>
          <option value={36}>History</option>
          <option value={10402}>Music</option>
          <option value={9648}>Mystery</option>
          <option value={10749}>Romance</option>
          <option value={878}>Sci-fi</option>
          <option value={53}>Thriller</option>
          <option value={10752}>War</option>
          <option value={37}>Western</option>
          <option value={27}>Horror</option>
        </select>
        <label htmlFor="queryBudget"> Budget </label>
        <div class={classes.textt}>{query7 / 1000000 + " Million $"}</div>
        <input
          type="range"
          name="queryBudget"
          min={1000.0}
          max={500000000.0}
          step={10000000.0}
          value={query7}
          onChange={budgetChangeHandler}
        />
        <label htmlFor="queryProfit"> Profit </label>
        <div class={classes.textt}>{query8 / 1000000 + " Million $"}</div>
        <input
          type="range"
          name="queryProfit"
          min={0}
          max={30000000000.0}
          step={50000000.0}
          value={query8}
          onChange={profitChangeHandler}
        />

        <label htmlFor="queryRelease">Release Year </label>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="number"
            min="1900"
            max="2099"
            step="1"
            value={query10}
            placeholder="1999"
            onChange={(e) => setQuery10(e.target.value)}
          />
          <p
            style={{
              color: "black",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {" "}
            To{" "}
          </p>
          <input
            type="number"
            min="1900"
            max="2099"
            step="1"
            value={query11}
            placeholder="2010"
            onChange={(e) => setQuery11(e.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Search
        </button>
        {loading ? (
          <center>
            <CircularProgress color="secondary" />
            <h1 style={{ color: "black" }}>Loading......</h1>
          </center>
        ) : (
          ""
        )}
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            // pass in movie prop into MovieCard component
            <MovieCard movie={movie} key={movie.poster_path} />
          ))}
      </div>
    </>
  );
}
export default MovieSearch;

function MovieCard(props) {
  return (
    <div className="card">
      {
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${props.movie.poster_path}`}
          alt="Poster Unavailable"
          className="card--image"
        />
      }
      <div className="card--content">
        <h3 className="card--title">{props.movie.title}</h3>
        {/* <p>
          <h4 className="card--release-rating">
            Release Date: {props.movie.release_date}
          </h4>
        </p> */}
        <p>
          <h4 className="card--release-rating">
            Rating: {props.movie.vote_average} out of 10
          </h4>
          <h4 className="card--release-rating">
            Release Date: {props.movie.release_date}
          </h4>
        </p>
        <p className="card--overview">{props.movie.overview}</p>
      </div>
    </div>
  );
}
export default MovieCard;

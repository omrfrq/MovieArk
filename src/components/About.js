import React from "react";
import "./About.css";

function About() {
  const myStyle = {
    // backgroundImage:
    //   "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    //   backgroundSize: cover,
    //   backgroundRepeat: no-repeat,
    //   position: absolute,
    //   margionTop: 70 ,
    //   backgroundposition: 50% 50%,
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   left: 0;
    //   content: "";
    //   z-index: 0;
  };
  return (
    <div
      className="Geeks"
      style={{ backgroundImage: "url(/wallpaperMovie.png)" }}
    >
      <div className="about">
        <h1>About Us</h1>
        <p>Welcome to MoviesArk, where your query is our duty.</p>
        <br />
        <p>
          Can't remember the movie name but know about the actor? We got you
          covered. Our Search Engine uses advanced queries and logics to search
          any movie you want. Using our filters to narrow the movie down, we
          provide accurate results. Making your movie searching easy is our
          mission. And if you want to search your query again, our website will
          give you immediate results.
        </p>
        <br />
      </div>
    </div>
  );
}

export default About;

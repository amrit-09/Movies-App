import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./Components/Movie";

const featuredAPI =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgAPI = "https://image.tmdb.org/t/p/w1280";
const searchAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    fetch(featuredAPI)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);
  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchResult) {
      fetch(searchAPI + searchResult)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
    }

    setSearchResult("");
  };

  const handleOnChange = (e) => {
    setSearchResult(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchResult}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie__container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;

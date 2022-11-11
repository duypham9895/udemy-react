import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      // const response = await fetch("https://swapi.dev/api/films");
      const response = await fetch(
        "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        setIsLoading(false);
        setError("Something went wrong!");
        return;
      }

      const data = await response.json();
      setMovies(Object.values(data));
      setIsLoading(false);
      return data.results;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler().catch(console.error);
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    try {
      // const response = await fetch("https://swapi.dev/api/films");
      await fetch(
        "https://react-complete-guilde-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const data = await response.json();
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} isLoading={isLoading} error={error} />
      </section>
    </>
  );
}

export default App;

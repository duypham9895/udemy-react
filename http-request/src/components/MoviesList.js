import React from "react";
import isEmpty from "lodash/isEmpty";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = ({ movies, error, isLoading }) => {
  const shouldShowEmptyMovies = !isLoading && isEmpty(movies) && isEmpty(error);
  const shouldShowError = !isLoading && !isEmpty(error);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (shouldShowEmptyMovies) {
    return <p>Not found any movies.</p>;
  }
  if (shouldShowError) {
    return <p>{error}</p>;
  }
  return (
    <ul className={classes["movies-list"]}>
      {movies.map(({ id, title, releaseDate, openingText }) => (
        <Movie
          key={id}
          title={title}
          releaseDate={releaseDate}
          openingText={openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;

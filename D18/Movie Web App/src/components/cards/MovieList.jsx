import React from "react";
import { Row } from "react-bootstrap";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <Row>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
      ))}
    </Row>
  );
};

export default MovieList;
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchMovies } from "../Api";
import SearchBar from "./cards/Search";
import MovieList from "./cards/MovieList";
import MovieModal from "./cards/MovieModal";
import axios from "axios";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchMovies(query);
    setMovies(results);
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          i: imdbID,
          apikey: import.meta.env.VITE_OMDB_API_KEY,
        },
      });
      setSelectedMovie(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center">Movie Search</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        </Col>
      </Row>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
      <MovieModal show={showModal} handleClose={handleCloseModal} movieDetails={selectedMovie} />
    </Container>
  );
};

export default Movies;
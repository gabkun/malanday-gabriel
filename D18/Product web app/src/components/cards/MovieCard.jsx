import React from "react";
import { Card, Col } from "react-bootstrap";

const MovieCard = ({ movie, onClick }) => {
  return (
    <Col sm={6} md={4} lg={3} className="mb-4">
      <Card onClick={() => onClick(movie.imdbID)} style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            <strong>Year:</strong> {movie.Year}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MovieCard;
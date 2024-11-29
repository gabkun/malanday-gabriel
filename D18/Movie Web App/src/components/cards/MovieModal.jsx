import React from "react";
import { Modal, Button } from "react-bootstrap";

const MovieModal = ({ show, handleClose, movieDetails }) => {
  if (!movieDetails) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movieDetails.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/300"}
          alt={movieDetails.Title}
          className="img-fluid mb-3"
        />
        <p><strong>Year:</strong> {movieDetails.Year}</p>
        <p><strong>Genre:</strong> {movieDetails.Genre}</p>
        <p><strong>Director:</strong> {movieDetails.Director}</p>
        <p><strong>Actors:</strong> {movieDetails.Actors}</p>
        <p><strong>Plot:</strong> {movieDetails.Plot}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;
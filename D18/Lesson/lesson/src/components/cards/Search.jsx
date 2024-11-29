import React from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <Form onSubmit={handleSearch}>
      <Form.Group controlId="movieSearch">
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2 w-100">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
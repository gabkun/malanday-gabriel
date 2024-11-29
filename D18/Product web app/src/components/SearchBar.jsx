import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;
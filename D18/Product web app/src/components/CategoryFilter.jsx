import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  return (
    <Form.Select
    aria-label="Category Filter"
    onChange={(e) => onCategoryChange(e.target.value)}
  >
    <option value="All">All Categories</option>
    {categories.map((category) => (
      <option key={category} value={category}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </option>
    ))}
  </Form.Select>
  )
}

export default CategoryFilter
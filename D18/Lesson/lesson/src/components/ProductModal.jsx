import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductModal = ({ product, onClose }) => {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid mb-3"
          style={{ maxHeight: '300px', objectFit: 'contain' }}
        />
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal
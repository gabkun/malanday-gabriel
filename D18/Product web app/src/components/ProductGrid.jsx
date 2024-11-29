import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import ProductModal from './ProductModal';

const ProductGrid = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const handleProductClick = (product) => {
      setSelectedProduct(product);
    };
  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Button variant="primary" onClick={() => handleProductClick(product)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  )
}

export default ProductGrid
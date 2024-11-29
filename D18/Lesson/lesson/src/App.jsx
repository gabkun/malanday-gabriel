import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from './Api';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const productsData = await fetchProducts();
      const categoriesData = await fetchCategories();
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    };
    loadData();
  }, []);

  const handleCategoryChange = async (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const productsByCategory = await fetchProductsByCategory(category);
      setFilteredProducts(productsByCategory);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(searchResults);
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Product Showcase</h1>
      <Row className="mb-3">
        <Col md={6}>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </Col>
        <Col md={6}>
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </Col>
      </Row>
      <ProductGrid products={filteredProducts} />
    </Container>
  );
}

export default App;
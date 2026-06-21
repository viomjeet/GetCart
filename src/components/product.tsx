import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../dist/CartContext';
import { useTheme } from '../dist/ThemeContext';
import { Button, Row, Col, Form, InputGroup, Badge } from 'react-bootstrap';
import { FiSearch, FiShoppingBag, FiStar } from 'react-icons/fi';
import productsData from '../lib/procuct.json';

const SearchIcon = FiSearch as any;
const BagIcon = FiShoppingBag as any;
const StarIcon = FiStar as any;

export default function Product() {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const isDark = (theme === 'dark');

  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = productsData.filter((product: any) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = product.rating >= minRating;
    return matchesSearch && matchesRating;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className={`container-fluid px-lg-5 mt-4 pb-5 ${isDark ? 'text-white' : 'text-dark'}`}>
      <Row className="g-4">

        <Col lg={3} md={4}>
          <div className={`p-4 rounded-4 shadow-sm border sticky-top ${isDark ? 'bg-dark border-secondary' : 'bg-light border-light'
            }`} style={{ top: '20px' }}>
            <h5 className="fw-bold mb-4">Filters</h5>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold">Search Premium Beauty</Form.Label>
              <InputGroup>
                <InputGroup.Text className={isDark ? 'bg-dark text-white-50 border-secondary' : 'bg-white text-muted'}>
                  <SearchIcon size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Lipstick, Nail paint..."
                  className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-semibold d-flex justify-content-between">
                <span>Minimum Rating</span>
                <span className="text-warning fw-bold">{minRating || 'All'} {minRating > 0 && '★'}</span>
              </Form.Label>
              <Form.Range
                min={0}
                max={4.5}
                step={0.5}
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
            </Form.Group>

            {minRating > 0 || searchTerm ? (
              <Button
                variant="link"
                className="text-danger text-decoration-none p-0 small fw-semibold mt-2"
                onClick={() => { setSearchTerm(''); setMinRating(0); }}
              >
                Clear All Filters
              </Button>
            ) : null}
          </div>
        </Col>

        <Col lg={9} md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Cosmetics & Beauty</h2>
              <p className={isDark ? 'text-white-50 mb-0 small' : 'text-muted mb-0 small'}>
                Showing {filteredProducts.length} premium products
              </p>
            </div>
          </div>

          <Row className="g-4">
            {filteredProducts.map((product: any) => (
              <Col lg={4} sm={6} key={product.id}>

                <div className={`card h-100 border rounded-4 shadow-sm overflow-hidden d-flex flex-column justify-content-between ${isDark ? 'bg-dark border-secondary text-white' : 'bg-white border-light text-dark'
                  }`}>

                  <div className="position-relative overflow-hidden bg-white d-flex align-items-center justify-content-center" style={{ height: '220px' }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid h-100 w-100 object-fit-cover transition-transform"
                      style={{ transition: 'transform 0.3s ease' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60";
                      }}
                    />
                    <Badge
                      bg="warning"
                      className="text-dark position-absolute bottom-0 start-0 m-3 px-2.5 py-1.5 rounded-3 d-flex align-items-center gap-1 fw-bold shadow"
                    >
                      <StarIcon size={12} className="fill-dark" />
                      <span>{product.rating}</span>
                    </Badge>
                  </div>

                  <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-1 text-truncate-2" style={{ height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {product.title}
                      </h6>
                      <p className={`small mb-3 text-truncate-2 ${isDark ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.8rem', height: '36px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fs-5 fw-bold text-warning">Rs. {product.price}</span>
                        <span className="text-success small fw-semibold">In Stock</span>
                      </div>

                      <Button
                        variant={isDark ? "outline-warning" : "warning"}
                        className={`w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 ${!isDark && 'text-dark'}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        <BagIcon size={16} />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>

                </div>
              </Col>
            ))}

            {filteredProducts.length === 0 && (
              <Col xs={12} className="text-center py-5">
                <div className="fs-1 mb-2">💄🔍</div>
                <h5 className="fw-semibold">No Cosmetics Found</h5>
                <p className={isDark ? 'text-white-50' : 'text-muted'}>Try adjusting your keywords or rating constraints filter parameters.</p>
              </Col>
            )}
          </Row>
        </Col>

      </Row>
    </div>
  );
}
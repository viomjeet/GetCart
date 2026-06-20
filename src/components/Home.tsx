import { useTheme } from '../dist/ThemeContext';
import { useCart } from '../dist/CartContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productsData from '../lib/procuct.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const isDark = theme === 'dark';

  const featuredProducts = productsData.slice(0, 6);

  return (
    <div className={`${isDark ? 'text-white' : 'text-dark'} min-vh-100 mb-5`}>     
     
      <div className={`p-5 rounded-4 mb-5 shadow-sm text-center text-md-start ${
        isDark ? 'bg-dark border border-secondary border-opacity-25' : 'bg-light'
      }`}>
        <Row className="align-items-center gy-4">
          <Col md={8}>
            <h1 className="display-4 fw-bold mb-3">
              Discover Next-Gen <span className="text-warning">Gadgets</span>
            </h1>
            <p className={`lead mb-4 ${isDark ? 'text-white-50' : 'text-muted'}`}>
              Your premium destination for high-quality audio gear, smart electronics, and daily tech essentials. Enjoy free shipping on orders above Rs. 500!
            </p>
            {/* FIX: Type error हटाने के लिए Link को ही बूटस्ट्रैप बटन क्लास दे दी है */}
            <Link to="/products" className="btn btn-warning fw-bold text-dark px-4 py-2.5 shadow-sm">
              Shop All Products
            </Link>
          </Col>
          <Col md={4} className="text-center d-none d-md-block fs-1">
            🛒✨🎧
          </Col>
        </Row>
      </div>

      <div className="mb-5">
        <h4 className="fw-bold mb-4 d-flex justify-content-between align-items-center">
          <span>Featured Products</span>
          <Link to="/products" className="text-warning text-decoration-none fs-6">View All</Link>
        </h4>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }}
          className="pb-5"
        >
          {featuredProducts.map((product: any) => (
            <SwiperSlide key={product.id}>
              <div className={`p-4 rounded border shadow-sm h-100 d-flex flex-column justify-content-between ${
                isDark ? 'bg-dark border-secondary' : 'bg-light border-light'
              }`}>
                <div>
                  <h5 className="fw-semibold mb-2 text-truncate">{product.title}</h5>
                  <p className={`fw-bold mb-3 ${isDark ? 'text-warning' : 'text-primary'}`}>Rs. {product.price}</p>
                </div>
                <Button variant="outline-warning" size="sm" className="w-100 fw-semibold mt-2" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="py-4 border-top border-secondary border-opacity-10">
        <Row className="text-center gy-4">
          <Col xs={12} md={4}>
            <div className="fs-2 mb-2">🚚</div>
            <h6 className="fw-bold mb-1">Fast Delivery</h6>
            <p className={`small mb-0 ${isDark ? 'text-white-50' : 'text-muted'}`}>Pan-India shipping in 3-5 business days</p>
          </Col>
          <Col xs={12} md={4}>
            <div className="fs-2 mb-2">🛡️</div>
            <h6 className="fw-bold mb-1">Secure Payments</h6>
            <p className={`small mb-0 ${isDark ? 'text-white-50' : 'text-muted'}`}>100% encrypted cash on delivery or online flow</p>
          </Col>
          <Col xs={12} md={4}>
            <div className="fs-2 mb-2">🤝</div>
            <h6 className="fw-bold mb-1">24/7 Assistance</h6>
            <p className={`small mb-0 ${isDark ? 'text-white-50' : 'text-muted'}`}>Dedicated customer support via email and chat</p>
          </Col>
        </Row>
      </div>

    </div>
  );
}
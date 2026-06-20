import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

// Typecast icons to avoid TypeScript JSX return type bugs
const CartIcon = FiShoppingCart as any;
const GithubIcon = FiGithub as any;
const Callme = FiPhone as any;
const LinkedinIcon = FiLinkedin as any;
const MailIcon = FiMail as any;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white-50 py-5 mt-auto border-top border-secondary border-opacity-25">
      <Container>
        <Row className="gy-4">

          {/* Column 1: Brand Logo & Short Info */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <h5 className="text-warning fw-bold text-uppercase d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-3">
              <CartIcon size={22} />
              <span>Get<span className="text-white fw-light">Cart</span></span>
            </h5>
            <p className="small px-3 px-md-0">
              Your premium destination for high-quality audio equipment and wireless modern gadgets. Built for speed and reliability.
            </p>
          </Col>

          {/* Column 2: Quick Links Navigation */}
          <Col xs={6} md={4} className="text-center">
            <h6 className="text-white fw-semibold mb-3 text-uppercase small tracking-wider">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-decoration-none text-white-50 text-hover-warning">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none text-white-50 text-hover-warning">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-decoration-none text-white-50 text-hover-warning">Shopping Cart</Link>
              </li>
            </ul>
          </Col>

          {/* Column 3: Social & Contact */}
          <Col xs={6} md={4} className="text-center text-md-end">
            <h6 className="text-white fw-semibold mb-3 text-uppercase small tracking-wider">Connect With Us</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <a href="https://github.com/viomjeet" target="_blank" rel="noreferrer" className="text-white-50 text-hover-warning"><GithubIcon size={20} /></a>
              <a href="https://linkedin.com/in/viomjeet" target="_blank" rel="noreferrer" className="text-white-50 text-hover-warning"><LinkedinIcon size={20} /></a>
              <a href="mailto:viomjeet@gmail.com" className="text-white-50 text-hover-warning"><MailIcon size={20} /></a>
              <a href="tel:+919716785812" className="text-white-50 text-hover-warning"><Callme size={20} /></a>
            </div>
            <p className="small mb-0">Need help? <span className="text-white">viomjeet@gmail.com</span>c</p>
          </Col>

        </Row>

        <hr className="my-4 border-secondary opacity-25" />

        {/* Bottom Bar Container */}
        <Row className="align-items-center small">
          <Col xs={12} sm={6} className="text-center text-sm-start mb-2 mb-sm-0">
            &copy; {currentYear} GetCart Store. All rights reserved.
          </Col>
          <Col xs={12} sm={6} className="text-center text-sm-end text-white-25">
            Designed with React & Bootstrap
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
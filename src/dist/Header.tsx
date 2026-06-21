import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Product from '../components/product';
import Cart from '../components/cartItems';
import { useTheme } from './ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from './CartContext';
import Checkout from '../components/Checkout';
import { Toaster } from 'react-hot-toast';

export default function Header() {
  const { getCartCount } = useCart();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = (theme === 'dark');

  const setactive = (path: string) => {
    return location.pathname === path ? "text-warning" : (isDark ? "text-white-50" : "text-dark-50");
  };

  const SunIcon = FiSun as any;
  const MoonIcon = FiMoon as any;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ top: 20, zIndex: 99 }} />
      <Navbar
        expand="lg"
        className="mb-4 shadow-sm px-3 py-2 bg-color text-color"
        bg={isDark ? 'dark' : 'light'}
        variant={isDark ? 'dark' : 'light'}
        
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase text-warning">
            GetCart
          </Navbar.Brand>

          <div className="d-flex align-items-center order-lg-last gap-1">
            <button className={`btn btn-link p-2 border-0 shadow-none ${isDark ? 'text-white-50' : 'text-dark-50'}`} onClick={toggleTheme}>
              {isDark ? <SunIcon size={20} className="text-warning" /> : <MoonIcon size={20} />}
            </button>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </div>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto mt-2 mt-lg-0 align-items-start align-items-lg-center w-100 justify-content-lg-end">
              <Nav.Link as={Link} to="/" className={`${setactive('/')} ps-0 pe-3 py-2`}>Home</Nav.Link>
              <Nav.Link as={Link} to="/products" className={`${setactive('/products')} ps-0 pe-3 py-2`}>Products</Nav.Link>
              <Nav.Link as={Link} to="/cart" className={`${setactive('/cart')} ps-0 pe-3 py-2`}>
                <span className="position-relative d-inline-block p-1">
                  Cart 🛒
                  {getCartCount() > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.55rem' }}>
                      {getCartCount()}
                    </Badge>
                  )}
                </span>
              </Nav.Link>

              <NavDropdown
                title={
                  <span className="d-inline-flex align-items-center gap-2 text-nowrap">
                    <span>Account</span>
                  </span>
                }
                id="collasible-nav-dropdown"
                className={`d-none ps-0 py-2 ${isDark ? 'text-white-50' : 'text-dark-50'}`}
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile" className="d-flex align-items-center gap-2 py-2">
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/settings" className="d-flex align-items-center gap-2 py-2">
                  Settings
                </NavDropdown.Item>

                <NavDropdown.Divider className="border-secondary opacity-25" />

                <NavDropdown.Item href="#logout" className="d-flex align-items-center gap-2 text-danger py-2">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}
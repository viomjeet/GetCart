import React, { useState } from 'react';
import { useCart } from '../dist/CartContext';
import { useTheme } from '../dist/ThemeContext';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FiCheckCircle, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CheckIcon = FiCheckCircle as any;
const ArrowIcon = FiArrowLeft as any;
const CardIcon = FiCreditCard as any;

export default function Checkout() {
    const { cartItems, delToCart } = useCart();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        paymentMode: 'cod'
    });

    // गणना (Calculations)
    const totalPrice = (cartItems || []).reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);
    const deliveryCharge = totalPrice > 500 ? 0 : 40;
    const finalAmount = totalPrice + deliveryCharge;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ऑर्डर प्लेस होने का स्टेट बदलें
        setOrderPlaced(true);

        // कार्ट को खाली करने के लिए delToCart को हर आइटम की ID के साथ कॉल करें
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach((item: any) => {
                delToCart(item.id);
            });
        }
    };

    // 1. अगर ऑर्डर सफ़ल हो जाता है (Success State)
    if (orderPlaced) {
        return (
            <div className={`container min-vh-100 mt-4 pb-5 mb-5 ${isDark ? 'text-white' : 'text-dark'}`}>
                <CheckIcon size={64} className="text-success mb-3" />
                <h2 className="fw-bold">Order Placed Successfully!</h2>
                <p className={isDark ? 'text-white-50' : 'text-muted'}>
                    Thank you for shopping with us. Your order id is #GTC{Math.floor(100000 + Math.random() * 900000)}.
                </p>
                <Link to="/products" className="fw-bold text-dark mt-3 px-4 py-2">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // 2. अगर कार्ट पहले से खाली है
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className={`container mt-5 text-center py-5 ${isDark ? 'text-white' : 'text-dark'}`}>
                <h3>No items to checkout!</h3>
                <Link to="/products" className="mt-3">
                    Go to Products
                </Link>
            </div>
        );
    }

    return (
        <div className={`container min-vh-100 mt-4 pb-5 mb-5 ${isDark ? 'text-white' : 'text-dark'}`}>
            <div className="mb-4 d-flex align-items-center gap-2">
                <Link to="/cart" className={`p-0 ${isDark ? 'text-white-50' : 'text-dark-50'}`}>
                    <ArrowIcon size={20} />
                </Link>
                <h4 className="mb-0 fw-bold">Checkout / Proceed to Buy</h4>
            </div>

            <Row className="g-4">
                {/* Shipping Form (Left Side) */}
                <Col lg={7}>
                    <div className={`p-4 rounded shadow-sm border ${isDark ? 'bg-dark border-secondary' : 'bg-light border-light'}`}>
                        <h5 className="fw-bold mb-4">Shipping & Delivery Details</h5>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Enter your name"
                                    className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold">Mobile Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="10-digit mobile number"
                                    className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold">Flat / House No. / Area / Street</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="address"
                                    required
                                    placeholder="Complete address details"
                                    className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold">Town/City</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            required
                                            placeholder="City"
                                            className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold">Pincode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zip"
                                            required
                                            placeholder="6-digit PIN"
                                            className={isDark ? 'bg-dark text-white border-secondary' : 'bg-white text-dark'}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h5 className="fw-bold mt-4 mb-3">Payment Method</h5>
                            <div className={`p-3 rounded border mb-4 ${isDark ? 'border-secondary bg-dark-50' : 'border-light bg-white'}`}>
                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery (COD)"
                                    name="paymentMode"
                                    id="cod"
                                    value="cod"
                                    defaultChecked
                                    className="fw-semibold"
                                    onChange={handleInputChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Online Payment (UPI, Card, NetBanking)"
                                    name="paymentMode"
                                    id="online"
                                    value="online"
                                    className="fw-semibold mt-2"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Button type="submit" variant="warning" className="w-100 py-2.5 fw-bold text-dark d-flex align-items-center justify-content-center gap-2 shadow-sm">
                                <CardIcon size={18} />
                                <span>Place Your Order</span>
                            </Button>
                        </Form>
                    </div>
                </Col>

                {/* Order Summary Widget (Right Side) */}
                <Col lg={5}>
                    {/* FIX: यहाँ style में zIndex: 1 और position: 'sticky' को इनलाइन हैंडल किया है 
                      ताकि इसका z-index हेडर के ड्रॉपडाउन (1000+) से हमेशा नीचे रहे।
                    */}
                    <div 
                        className={`p-4 rounded shadow-sm border ${isDark ? 'bg-dark border-secondary' : 'bg-light border-light'}`} 
                        style={{ position: 'sticky', top: '20px', zIndex: 1 }}
                    >
                        <h5 className="fw-bold mb-3">Order Summary</h5>

                        <div className="border-bottom pb-2 mb-3 border-opacity-25">
                            {cartItems.map((item: any) => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 small">
                                    <span className="text-truncate me-3" style={{ maxWidth: '220px' }}>
                                        {item.title} <strong className="text-warning">x{item.quantity || 1}</strong>
                                    </span>
                                    <span className="fw-semibold">Rs. {item.price * (item.quantity || 1)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-between mb-2 small">
                            <span className={isDark ? 'text-white-50' : 'text-muted'}>Items Total:</span>
                            <span>Rs. {totalPrice}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2 small">
                            <span className={isDark ? 'text-white-50' : 'text-muted'}>Delivery Charges:</span>
                            <span className={deliveryCharge === 0 ? "text-success fw-bold" : ""}>
                                {deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`}
                            </span>
                        </div>

                        <hr className="my-3 border-opacity-25" />

                        <div className="d-flex justify-content-between mb-0 fs-5 fw-bold">
                            <span>Total Payable:</span>
                            <span className="text-warning">Rs. {finalAmount}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
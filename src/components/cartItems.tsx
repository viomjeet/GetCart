import React from 'react';
import { useCart } from '../dist/CartContext';
import { useTheme } from '../dist/ThemeContext';
import { Button } from 'react-bootstrap';
import { FiTrash, FiCreditCard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const DeleteIcon = FiTrash as any;
const CardIcon = FiCreditCard as any;

export default function CartItems() {
    const { cartItems, delToCart } = useCart();
    const { theme } = useTheme();
    const isDark = (theme === 'dark');
    const navigate = useNavigate();

    // Calculate dynamic order summary totals
    const totalItems = (cartItems || []).reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
    const totalPrice = (cartItems || []).reduce((acc: number, item: any) => acc + (item.price * (item.quantity || 1)), 0);

    return (
        <div className={`container min-vh-100 mt-4 pb-5 ${isDark ? 'text-white' : 'text-dark'}`}>
            <h5 className="mb-4 fw-bold">Your Shopping Cart</h5>

            <div className="row">
                {/* Left Side: Dynamic list of Cart items */}
                <div className={cartItems.length > 0 ? "col-lg-8" : "col-12"}>
                    <div className="row">
                        {(cartItems || []).map((product: any) => (
                            <div className="col-12 mb-3" key={product.id}>
                                <div className={`${
                                    isDark ? 'bg-dark text-white border-secondary' : 'bg-light text-dark border-light'
                                } p-3 rounded shadow-sm border d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3`}>
                                    
                                    {/* 1. PRODUCT IMAGE ADDED HERE */}
                                    <div className="rounded overflow-hidden bg-white d-flex align-items-center justify-content-center flex-shrink-0" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <img 
                                            src={product.image || "https://via.placeholder.com/80"} 
                                            alt={product.title} 
                                            className="img-fluid h-100 w-100 object-fit-cover"
                                        />
                                    </div>

                                    {/* 2. PRODUCT DETAILS */}
                                    <div className="flex-grow-1">
                                        <h5 className="fw-semibold mb-1 fs-6 text-truncate" style={{ maxWidth: '320px' }}>
                                            {product.title}
                                        </h5>
                                        <div className="d-flex flex-wrap align-items-center gap-3 small">
                                            <span className={isDark ? 'text-white-50' : 'text-muted'}>
                                                Price: <strong className="text-warning">Rs. {product.price}</strong>
                                            </span>
                                            {product.quantity && (
                                                <span className={isDark ? 'text-white-50' : 'text-muted'}>
                                                    Quantity: <strong>{product.quantity}</strong>
                                                </span>
                                            )}
                                            {product.quantity && (
                                                <span className={isDark ? 'text-white-50' : 'text-muted'}>
                                                    Total: <strong>Rs. {product.price * product.quantity}</strong>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 3. DELETE ACTION BUTTON */}
                                    <div className="ms-sm-auto flex-shrink-0">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className='d-inline-flex align-items-center gap-2 px-3 py-1.5 fw-semibold'
                                            onClick={() => delToCart(product.id)}
                                        >
                                            <DeleteIcon size={14} />
                                            <span>Delete</span>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Theme-aware Dynamic Checkout Panel summary card */}
                {cartItems.length > 0 && (
                    <div className="col-lg-4 mb-3">
                        <div className={`p-4 rounded shadow-sm border ${
                            isDark ? 'bg-dark border-secondary text-white' : 'bg-light border-light text-dark'
                        }`}>
                            <h5 className="fw-bold mb-3 border-bottom pb-2 border-opacity-25">Order Summary</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className={isDark ? 'text-white-50' : 'text-muted'}>Total Items:</span>
                                <span className="fw-semibold">{totalItems}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-4 fs-5">
                                <span className="fw-bold">Total Amount:</span>
                                <span className="fw-bold text-warning">Rs. {totalPrice}</span>
                            </div>

                            <Button
                                variant="warning"
                                className="w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2 shadow-sm"
                                onClick={() => navigate('/checkout')}
                            >
                                <CardIcon size={18} />
                                <span>Proceed to Buy</span>
                            </Button>
                        </div>
                    </div>
                )}

                {/* Empty Cart Placeholder state */}
                {cartItems.length === 0 && (
                    <div className="col-12 mt-2">
                        <p className={`alert ${isDark ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'} text-center py-4`}>
                            Your cart is empty! 🛒
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
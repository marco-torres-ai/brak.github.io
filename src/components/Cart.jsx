import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const phoneNumber = "51999999999"; // Replace with actual WhatsApp number
    let message = "Hello! I would like to purchase the following items from Brak:\n\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Size: ${item.size} - Qty: ${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total: S/ ${cartTotal.toFixed(2)}*\n\nPlease let me know how to proceed with the payment.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn btn-ghost" onClick={toggleCart}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your cart is empty.</p>
              <button className="btn btn-primary" onClick={toggleCart}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-title-price">
                      <h3>{item.name}</h3>
                      <p className="item-price">S/ {item.price.toFixed(2)}</p>
                    </div>
                    <p className="item-size">Size: {item.size}</p>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total flex-between">
              <span>Subtotal</span>
              <span>S/ {cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-tax-note">Taxes and shipping calculated at checkout.</p>
            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

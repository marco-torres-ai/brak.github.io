import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, cart } = useCart();
  const location = useLocation();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'glass scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="nav-links desktop-menu">
          <li><Link to="/catalog">Shop All</Link></li>
          <li><Link to="/catalog?category=gym">Gym</Link></li>
          <li><Link to="/catalog?category=urban">Urban</Link></li>
          <li><Link to="/catalog?category=accessories">Accessories</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="cart-btn btn-ghost" onClick={toggleCart}>
            <ShoppingBag size={24} strokeWidth={1.5} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          
          <button 
            className="mobile-menu-btn btn-ghost" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul>
            <li><Link to="/catalog">All Products</Link></li>
            <li><Link to="/catalog?category=gym">Gym Wear</Link></li>
            <li><Link to="/catalog?category=urban">Urban Collection</Link></li>
            <li><Link to="/catalog?category=accessories">Accessories</Link></li>
            <li><Link to="/admin" className="admin-link">Admin Access</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

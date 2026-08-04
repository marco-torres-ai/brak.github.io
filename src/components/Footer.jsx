import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-accent-line"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand-col">
            <Logo />
            <p className="footer-tagline">
              Where luxury meets performance. Engineered for those who refuse to compromise.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Social">
                <Globe size={18} strokeWidth={1.5} />
              </a>
              <a href="mailto:hello@brak.com" aria-label="Email">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Shop</h4>
            <ul>
              <li><Link to="/catalog">All Products</Link></li>
              <li><Link to="/catalog?category=gym">Gym Wear</Link></li>
              <li><Link to="/catalog?category=urban">Urban</Link></li>
              <li><Link to="/catalog?category=accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/admin">Admin Portal</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Info</h4>
            <ul>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#sizing">Size Guide</a></li>
              <li><a href="#care">Care Instructions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BRAK Apparel. All rights reserved.</p>
          <p className="footer-location">
            <MapPin size={12} strokeWidth={1.5} />
            <span>Designed in Lima, Peru</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

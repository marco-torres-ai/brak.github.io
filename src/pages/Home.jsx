import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* ─── Hero Section ─── */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-vignette"></div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Zap size={12} strokeWidth={2} />
            <span>Premium Collection 2026</span>
          </div>
          <h1 className="h1 animate-fade-up" style={{ animationDelay: '0.25s' }}>
            REDEFINE<br />
            <span className="text-accent-stroke">YOUR LIMITS</span>
          </h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Premium sportswear and urban apparel engineered<br className="hide-mobile" />
            for those who refuse to compromise.
          </p>
          <div className="hero-actions animate-fade-up" style={{ animationDelay: '0.55s' }}>
            <Link to="/catalog" className="btn btn-primary">
              Shop Collection <ArrowRight size={16} style={{ marginLeft: '10px' }} />
            </Link>
            <Link to="/catalog?category=gym" className="btn btn-outline">
              Gym Wear
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Marquee Banner ─── */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>FREE SHIPPING</span>
            <span className="marquee-dot">◆</span>
            <span>PREMIUM QUALITY</span>
            <span className="marquee-dot">◆</span>
            <span>LIMITED EDITION</span>
            <span className="marquee-dot">◆</span>
            <span>ENGINEERED PERFORMANCE</span>
            <span className="marquee-dot">◆</span>
            <span>FREE SHIPPING</span>
            <span className="marquee-dot">◆</span>
            <span>PREMIUM QUALITY</span>
            <span className="marquee-dot">◆</span>
            <span>LIMITED EDITION</span>
            <span className="marquee-dot">◆</span>
            <span>ENGINEERED PERFORMANCE</span>
            <span className="marquee-dot">◆</span>
          </div>
        </div>
      </section>

      {/* ─── Collections Grid ─── */}
      <section className="categories section-padding">
        <div className="container">
          <div className="section-header text-center mb-5">
            <p className="section-label">Curated for you</p>
            <h2 className="h2">The Collections</h2>
          </div>
          <div className="category-grid">
            <Link to="/catalog?category=gym" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Gym Wear" loading="lazy" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <span className="category-label">01</span>
                <h3>Gym Wear</h3>
                <p>Engineered for peak performance</p>
                <span className="category-cta">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/catalog?category=urban" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop" alt="Urban Collection" loading="lazy" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <span className="category-label">02</span>
                <h3>Urban</h3>
                <p>Street-ready minimalist design</p>
                <span className="category-cta">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/catalog?category=accessories" className="category-card">
              <div className="category-img-wrapper">
                <img src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop" alt="Accessories" loading="lazy" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <span className="category-label">03</span>
                <h3>Accessories</h3>
                <p>The essential finishing touches</p>
                <span className="category-cta">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Brand Statement ─── */}
      <section className="brand-statement section-padding">
        <div className="container">
          <div className="brand-statement-inner">
            <div className="brand-statement-line"></div>
            <blockquote className="brand-quote">
              We don't follow trends.<br />
              We engineer <em>excellence</em>.
            </blockquote>
            <p className="brand-desc">
              Every piece in our collection is crafted with precision, tested under pressure,
              and designed for those who demand more from their gear. This is performance
              luxury — where cutting-edge technology meets uncompromising style.
            </p>
            <div className="brand-stats">
              <div className="brand-stat">
                <span className="stat-number">4</span>
                <span className="stat-label">Collections</span>
              </div>
              <div className="brand-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Premium Materials</span>
              </div>
              <div className="brand-stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

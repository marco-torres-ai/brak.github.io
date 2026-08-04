import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, Search, ArrowLeft } from 'lucide-react';
import { getProducts } from '../mockDb';
import './Catalog.css';

const CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'gym', label: 'Gym' },
  { key: 'urban', label: 'Urban' },
  { key: 'accessories', label: 'Accessories' },
];

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [modalImage, setModalImage] = useState('');

  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const categoryFilter = queryParams.get('category') || '';

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dbProducts = await getProducts();
        setProducts(dbProducts || []);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const isActive = p.status === 'active';
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    return isActive && matchesCategory;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setModalImage(product.image);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = '';
  };

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize) {
      addToCart(selectedProduct, selectedSize);
      closeProductModal();
    }
  };

  const handleCategoryChange = (key) => {
    if (key) {
      navigate(`/catalog?category=${key}`);
    } else {
      navigate('/catalog');
    }
  };

  if (loading) {
    return <div className="catalog-loading"><div className="loader"></div></div>;
  }

  return (
    <div className="catalog section-padding">
      <div className="container">
        <div className="catalog-header mb-4">
          <Link to="/" className="back-link">
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span>Home</span>
          </Link>
          <h1 className="h2">
            {categoryFilter ? `${categoryFilter.toUpperCase()} COLLECTION` : 'ALL PRODUCTS'}
          </h1>
          <p className="subtitle">Discover our premium selection</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="catalog-filters mb-5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`filter-tab ${categoryFilter === cat.key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card animate-fade-up"
              style={{ animationDelay: `${0.05 * index}s` }}
              onClick={() => openProductModal(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.stock === 0 && (
                  <div className="sold-out-badge">SOLD OUT</div>
                )}
                <div className="product-overlay">
                  <span>Quick View</span>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category-tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="price">S/ {parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <Search size={40} strokeWidth={1} />
            <h3>No products found</h3>
            <p className="subtitle">We couldn't find any products in this category.</p>
            <button className="btn btn-outline mt-3" onClick={() => navigate('/catalog')}>
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay open" onClick={closeProductModal}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close btn-ghost" onClick={closeProductModal}>
              <X size={22} strokeWidth={1.5} />
            </button>
            <div className="modal-grid">
              <div className="modal-image-container">
                <div className="modal-image">
                  <img src={modalImage} alt={selectedProduct.name} />
                </div>
                {selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0 && (
                  <div className="modal-gallery">
                    <img
                      src={selectedProduct.image}
                      alt="Primary"
                      className={`gallery-thumb ${modalImage === selectedProduct.image ? 'active' : ''}`}
                      onClick={() => setModalImage(selectedProduct.image)}
                    />
                    {selectedProduct.additionalImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Gallery ${i}`}
                        className={`gallery-thumb ${modalImage === img ? 'active' : ''}`}
                        onClick={() => setModalImage(img)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-details">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-price">S/ {parseFloat(selectedProduct.price).toFixed(2)}</p>
                <p className="modal-desc">{selectedProduct.description}</p>

                <div className="size-selector">
                  <p>Select Size:</p>
                  <div className="size-options">
                    {selectedProduct.sizes?.map(size => (
                      <button
                        key={size}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                        disabled={selectedProduct.stock === 0}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-gold add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock === 0}
                >
                  {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const { toast, hideToast } = useCart();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Grain texture overlay */}
      <div className="noise-overlay" aria-hidden="true"></div>

      <Navbar />
      <Cart />
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={hideToast}
        type="cart"
      />

      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;

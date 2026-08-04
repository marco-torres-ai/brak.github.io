// src/mockDb.js
// This file simulates a backend (like Firebase) using browser localStorage
// It allows testing the Admin panel and Catalog without a real database setup.

const PRODUCTS_KEY = 'brak_products';
const AUTH_KEY = 'brak_admin_auth';

// Initial Mock Data
const initialProducts = [
  {
    id: '1',
    sku: 'BRK-CMPS-01',
    name: 'Onyx Compression Shirt',
    price: 45.00,
    stock: 24,
    status: 'active',
    category: 'gym',
    image: 'https://images.unsplash.com/photo-1616847229780-e34988710332?q=80&w=800&auto=format&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1616847229780-e34988710332?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Ultra-lightweight compression shirt designed for maximum mobility and sweat-wicking performance.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    sku: 'BRK-JGGR-01',
    name: 'Phantom Joggers',
    price: 65.00,
    stock: 12,
    status: 'active',
    category: 'gym',
    image: 'https://images.unsplash.com/photo-1552822184-a477de29f3df?q=80&w=800&auto=format&fit=crop',
    additionalImages: [],
    description: 'Tapered fit joggers with four-way stretch. Perfect for lifting or casual wear.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: '3',
    sku: 'BRK-OTEE-01',
    name: 'Graphite Oversized Tee',
    price: 35.00,
    stock: 0,
    status: 'active',
    category: 'urban',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    additionalImages: [],
    description: 'Premium heavyweight cotton oversized tee with minimalist branding.',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: '4',
    sku: 'BRK-HCAP-01',
    name: 'Brak Stealth Cap',
    price: 25.00,
    stock: 50,
    status: 'active',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    additionalImages: [],
    description: 'Classic dad hat with the Brak lightning bolt embroidered.',
    sizes: ['OS']
  }
];

// Initialize DB
export const initDb = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
};

// Auth methods
export const loginAdmin = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Hardcoded admin for simulation
  if (email === 'admin@brak.com' && password === 'admin123') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  throw new Error('Invalid credentials');
};

export const logoutAdmin = async () => {
  localStorage.removeItem(AUTH_KEY);
};

export const checkAuth = () => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

// Product methods
export const getProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  initDb();
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY));
};

export const addProduct = async (product) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = async (id, updatedData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const deleteProduct = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  let products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  products = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

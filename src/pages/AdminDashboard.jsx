import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth, logoutAdmin, getProducts, addProduct, updateProduct, deleteProduct } from '../mockDb';
import { LogOut, Plus, Trash2, Edit2, LayoutDashboard, Package, Search, X } from 'lucide-react';
import InventoryAnalytics from '../components/InventoryAnalytics';
import './Admin.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    stock: 0,
    status: 'active',
    category: 'gym',
    image: '',
    additionalImages: [],
    description: '',
    sizes: 'S, M, L'
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth()) {
      navigate('/admin');
      return;
    }
    setIsAuthed(true);
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 additional images.");
      return;
    }

    const validFiles = files.slice(0, 5);
    const newImages = [];

    let processed = 0;
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        processed++;
        if (processed === validFiles.length) {
          setFormData(prev => ({ ...prev, additionalImages: newImages }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const openAddForm = () => {
    setFormData({
      sku: '',
      name: '',
      price: '',
      stock: 0,
      status: 'active',
      category: 'gym',
      image: '',
      additionalImages: [],
      description: '',
      sizes: 'S, M, L'
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setFormData({
      sku: product.sku || '',
      name: product.name,
      price: product.price,
      stock: product.stock || 0,
      status: product.status || 'active',
      category: product.category,
      image: product.image,
      additionalImages: product.additionalImages || [],
      description: product.description,
      sizes: product.sizes.join(', ')
    });
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sizes: formData.sizes.split(',').map(s => s.trim())
    };

    try {
      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      setIsFormOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const filteredProducts = products.filter(p => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      (p.sku && p.sku.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
    );
  });

  if (loading || !isAuthed) {
    return <div className="admin-page flex-center"><div className="loader"></div></div>;
  }

  return (
    <div className="admin-dashboard section-padding">
      <div className="container">
        <div className="dashboard-header flex-between mb-4">
          <div>
            <h1 className="h2">Admin Portal</h1>
            <p className="subtitle">Manage inventory & analytics</p>
          </div>
          <button className="btn btn-outline logout-btn" onClick={handleLogout}>
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>

        <div className="admin-tabs mb-5">
          <button
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={16} /> Manage Inventory
          </button>
          <button
            className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <LayoutDashboard size={16} /> Analytics & Data
          </button>
        </div>

        {activeTab === 'analytics' ? (
          <InventoryAnalytics products={products} />
        ) : (
          <>
            <div className="dashboard-toolbar mb-4">
              <div className="search-bar">
                <Search size={16} strokeWidth={1.5} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="search-clear" onClick={() => setSearchQuery('')}>
                    <X size={14} />
                  </button>
                )}
              </div>
              <button className="btn btn-primary add-product-btn" onClick={openAddForm}>
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            {isFormOpen && (
              <div className="admin-form-container glass mb-5">
                <div className="form-container-header">
                  <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                  <button className="btn-ghost" onClick={() => setIsFormOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="admin-form grid-form">
                  <div className="form-group">
                    <label>SKU (Product Code)</label>
                    <input required type="text" name="sku" className="input-field" placeholder="BRK-XXX-01" value={formData.sku} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input required type="text" name="name" className="input-field" placeholder="Product name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Price (S/)</label>
                    <input required type="number" step="0.01" name="price" className="input-field" placeholder="0.00" value={formData.price} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input required type="number" name="stock" className="input-field" placeholder="0" value={formData.stock} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" className="input-field" value={formData.status} onChange={handleInputChange}>
                      <option value="active">Active (Visible)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" className="input-field" value={formData.category} onChange={handleInputChange}>
                      <option value="gym">Gym Wear</option>
                      <option value="urban">Urban Collection</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="input-field file-input"
                      onChange={handleImageUpload}
                      required={!formData.image}
                    />
                    {formData.image && (
                      <div className="image-preview-row">
                        <img src={formData.image} alt="Preview" className="form-preview-img" />
                      </div>
                    )}
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Images (Max 5)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="input-field file-input"
                      onChange={handleMultipleImagesUpload}
                    />
                    {formData.additionalImages && formData.additionalImages.length > 0 && (
                      <div className="image-preview-row">
                        {formData.additionalImages.map((img, i) => (
                          <img key={i} src={img} alt={`Additional ${i}`} className="form-preview-img small" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="form-group full-width">
                    <label>Sizes (comma separated)</label>
                    <input required type="text" name="sizes" className="input-field" placeholder="S, M, L, XL" value={formData.sizes} onChange={handleInputChange} />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea required name="description" className="input-field" rows="3" placeholder="Product description..." value={formData.description} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-actions full-width">
                    <button type="button" className="btn btn-ghost" onClick={() => setIsFormOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingId ? 'Update Product' : 'Save Product'}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="inventory-list glass">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-table-cell">
                        {searchQuery ? 'No products match your search.' : 'No products found. Add one above!'}
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          <img src={product.image} alt={product.name} className="admin-table-img" />
                        </td>
                        <td className="sku-cell">{product.sku || 'N/A'}</td>
                        <td className="name-cell">{product.name}</td>
                        <td className="category-cell">{product.category}</td>
                        <td>S/ {parseFloat(product.price).toFixed(2)}</td>
                        <td>
                          <span className={`stock-value ${product.stock === 0 ? 'danger' : product.stock < 5 ? 'warning' : ''}`}>
                            {product.stock || 0}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${product.status === 'draft' ? 'draft' : (product.stock === 0 ? 'out-of-stock' : 'active')}`}>
                            {product.status === 'draft' ? 'Draft' : (product.stock === 0 ? 'Out of Stock' : 'Active')}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn edit" onClick={() => openEditForm(product)} title="Edit">
                              <Edit2 size={15} />
                            </button>
                            <button className="icon-btn delete" onClick={() => handleDelete(product.id)} title="Delete">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

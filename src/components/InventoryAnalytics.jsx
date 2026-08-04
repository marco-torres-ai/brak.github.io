import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Package, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import './InventoryAnalytics.css';

const COLORS = ['#c9a96e', '#dfc08a', '#a8884d'];

const InventoryAnalytics = ({ products }) => {
  const analytics = useMemo(() => {
    let totalStock = 0;
    let totalValue = 0;
    let lowStockCount = 0;
    const categoryStats = {
      gym: { stock: 0, value: 0 },
      urban: { stock: 0, value: 0 },
      accessories: { stock: 0, value: 0 }
    };

    products.forEach(p => {
      const stock = parseInt(p.stock) || 0;
      const price = parseFloat(p.price) || 0;
      
      totalStock += stock;
      totalValue += stock * price;
      
      if (stock < 5) {
        lowStockCount++;
      }

      if (categoryStats[p.category]) {
        categoryStats[p.category].stock += stock;
        categoryStats[p.category].value += stock * price;
      }
    });

    const stockData = Object.keys(categoryStats).map(key => ({
      name: key.toUpperCase(),
      Stock: categoryStats[key].stock
    }));

    const valueData = Object.keys(categoryStats).map(key => ({
      name: key.toUpperCase(),
      value: categoryStats[key].value
    })).filter(d => d.value > 0);

    return { totalStock, totalValue, lowStockCount, stockData, valueData };
  }, [products]);

  return (
    <div className="analytics-dashboard">
      <div className="kpi-grid mb-5">
        <div className="kpi-card glass">
          <div className="kpi-header flex-between">
            <h4 className="subtitle">Total Products</h4>
            <Package size={20} className="text-accent" />
          </div>
          <div className="kpi-value">{products.length}</div>
          <div className="kpi-desc">Unique SKUs in catalog</div>
        </div>
        
        <div className="kpi-card glass">
          <div className="kpi-header flex-between">
            <h4 className="subtitle">Total Stock</h4>
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div className="kpi-value">{analytics.totalStock}</div>
          <div className="kpi-desc">Total physical items</div>
        </div>

        <div className="kpi-card glass">
          <div className="kpi-header flex-between">
            <h4 className="subtitle">Inventory Value</h4>
            <DollarSign size={20} className="text-accent" />
          </div>
          <div className="kpi-value">S/ {analytics.totalValue.toFixed(2)}</div>
          <div className="kpi-desc">Potential gross revenue</div>
        </div>

        <div className="kpi-card glass" style={{ borderColor: analytics.lowStockCount > 0 ? 'rgba(255, 77, 79, 0.3)' : '' }}>
          <div className="kpi-header flex-between">
            <h4 className="subtitle" style={{ color: analytics.lowStockCount > 0 ? '#ff4d4f' : '' }}>Low Stock Alerts</h4>
            <AlertCircle size={20} color={analytics.lowStockCount > 0 ? '#ff4d4f' : 'var(--accent-gray)'} />
          </div>
          <div className="kpi-value" style={{ color: analytics.lowStockCount > 0 ? '#ff4d4f' : '' }}>
            {analytics.lowStockCount}
          </div>
          <div className="kpi-desc">Items with &lt; 5 units</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card glass">
          <h3 className="mb-4 text-center">Stock by Category</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={analytics.stockData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(201, 169, 110, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201, 169, 110, 0.2)', borderRadius: '4px' }}
                />
                <Bar dataKey="Stock" fill="#c9a96e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <h3 className="mb-4 text-center">Inventory Value Distribution</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={analytics.valueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {analytics.valueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `S/ ${value.toFixed(2)}`}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(201, 169, 110, 0.2)', borderRadius: '4px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#888' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;

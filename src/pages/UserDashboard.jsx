import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  });

  // Sample inventory data - replace with actual API calls
  const sampleInventory = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, quantity: 15, minStock: 5, sku: 'LP-001' },
    { id: 2, name: 'Office Chair', category: 'Furniture', price: 199.99, quantity: 8, minStock: 3, sku: 'OC-002' },
    { id: 3, name: 'Notebook', category: 'Stationery', price: 4.99, quantity: 2, minStock: 10, sku: 'NB-003' },
    { id: 4, name: 'Desk Lamp', category: 'Electronics', price: 29.99, quantity: 0, minStock: 5, sku: 'DL-004' },
    { id: 5, name: 'Stapler', category: 'Stationery', price: 12.99, quantity: 25, minStock: 8, sku: 'ST-005' },
  ];

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load inventory data
    loadInventory();
  }, []);

  const loadInventory = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInventory(sampleInventory);
      calculateStats(sampleInventory);
      setLoading(false);
    }, 1000);
  };

  const calculateStats = (items) => {
    const totalProducts = items.length;
    const lowStock = items.filter(item => item.quantity > 0 && item.quantity <= item.minStock).length;
    const outOfStock = items.filter(item => item.quantity === 0).length;
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setStats({ totalProducts, lowStock, outOfStock, totalValue });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const getStockStatus = (item) => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.minStock) return 'low-stock';
    return 'in-stock';
  };

  const getStockColor = (item) => {
    const status = getStockStatus(item);
    switch (status) {
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStockText = (item) => {
    const status = getStockStatus(item);
    switch (status) {
      case 'out-of-stock': return 'Out of Stock';
      case 'low-stock': return 'Low Stock';
      default: return 'In Stock';
    }
  };

  // Close sidebar when clicking on a tab on mobile
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 md:p-6 border-b flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">🏪 Store Inventory</h1>
            <p className="text-sm text-gray-600 mt-1">Management System</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => handleTabClick('inventory')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'inventory' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package size={20} />
              <span>Inventory</span>
            </button>
            
            <button
              onClick={() => handleTabClick('sales')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'sales' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Sales</span>
            </button>
            
            <button
              onClick={() => handleTabClick('suppliers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'suppliers' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>Suppliers</span>
            </button>
            
            <button
              onClick={() => handleTabClick('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === 'settings' 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.first_name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.first_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                  {activeTab === 'dashboard' ? 'Dashboard' : 
                   activeTab === 'inventory' ? 'Inventory Management' :
                   activeTab === 'sales' ? 'Sales' :
                   activeTab === 'suppliers' ? 'Suppliers' : 'Settings'}
                </h2>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 lg:w-64"
                  />
                </div>
                
                {(activeTab === 'inventory' || activeTab === 'suppliers') && (
                  <button className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 hover:bg-blue-700 transition text-sm sm:text-base">
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Add New</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.totalProducts}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <Package className="text-blue-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Low Stock</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 mt-1 sm:mt-2">{stats.lowStock}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="text-yellow-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Out of Stock</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mt-1 sm:mt-2">{stats.outOfStock}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="text-red-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Total Value</p>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1 sm:mt-2">${stats.totalValue.toFixed(2)}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
                      <BarChart3 className="text-green-600 w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h3>
                </div>
                <div className="p-4 sm:p-6">
                  {inventory.filter(item => getStockStatus(item) !== 'in-stock').length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No stock alerts! Everything is well stocked.</p>
                  ) : (
                    <div className="space-y-3">
                      {inventory.filter(item => getStockStatus(item) !== 'in-stock').map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              getStockStatus(item) === 'out-of-stock' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}></div>
                            <div>
                              <span className="font-medium block">{item.name}</span>
                              <span className="text-sm text-gray-500">({item.sku})</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStockColor(item)}`}>
                              {getStockText(item)}
                            </span>
                            <span className="text-sm text-gray-600 hidden sm:block">Stock: {item.quantity}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Restock
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 sm:p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Products</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      {inventory.slice(0, 5).map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-sm text-gray-500 truncate">{item.category} • {item.sku}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-medium text-gray-900">${item.price}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 sm:p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center">
                        <Plus className="mx-auto text-gray-400 mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Add Product</p>
                      </button>
                      <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center">
                        <ShoppingCart className="mx-auto text-gray-400 mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                        <p className="text-xs sm:text-sm font-medium text-gray-700">New Sale</p>
                      </button>
                      <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center">
                        <Users className="mx-auto text-gray-400 mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Add Supplier</p>
                      </button>
                      <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-center">
                        <BarChart3 className="mx-auto text-gray-400 mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6" />
                        <p className="text-xs sm:text-sm font-medium text-gray-700">View Reports</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <h3 className="text-lg font-semibold text-gray-800">All Products</h3>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      <Filter size={16} />
                      <span className="hidden sm:inline">Filter</span>
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition text-sm">
                      <Plus size={16} />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">Qty</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500 sm:hidden">{item.category}</div>
                            <div className="text-xs text-gray-500 sm:hidden">SKU: {item.sku}</div>
                          </div>
                        </td>
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-900">{item.category}</div>
                        </td>
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${item.price}</div>
                        </td>
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap hidden xs:table-cell">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockColor(item)}`}>
                            <span className="sm:hidden">
                              {getStockText(item).charAt(0)}
                            </span>
                            <span className="hidden sm:inline">
                              {getStockText(item)}
                            </span>
                          </span>
                        </td>
                        <td className="px-3 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other Tabs - Placeholder Content */}
          {(activeTab === 'sales' || activeTab === 'suppliers' || activeTab === 'settings') && (
            <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'sales' && <ShoppingCart className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8" />}
                  {activeTab === 'suppliers' && <Users className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8" />}
                  {activeTab === 'settings' && <Settings className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8" />}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 capitalize">{activeTab} Management</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  {activeTab === 'sales' && 'Track your sales, view transaction history, and generate sales reports.'}
                  {activeTab === 'suppliers' && 'Manage your suppliers, track orders, and maintain supplier relationships.'}
                  {activeTab === 'settings' && 'Configure your store settings, user permissions, and system preferences.'}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
                  Configure {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard
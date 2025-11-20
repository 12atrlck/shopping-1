import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AdminInventory } from './components/AdminInventory';
import { AdminFinancials } from './components/AdminFinancials';
import { AdminUsers } from './components/AdminUsers';
import { User, UserRole, Product, CartItem, Sale } from './types';
import { INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_SALES } from './constants';
import { LayoutGrid, Users, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>(INITIAL_SALES);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'inventory' | 'financials' | 'users'>('inventory');

  // Simulate user tracking
  const [allUsers] = useState<User[]>(INITIAL_USERS);

  // Load data from local storage on mount (simulate persistence)
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedSales = localStorage.getItem('sales');
    if (storedProducts) setProducts(JSON.parse(storedProducts));
    if (storedSales) setSales(JSON.parse(storedSales));
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  const handleLogin = (role: UserRole) => {
    const foundUser = INITIAL_USERS.find(u => u.role === role);
    if (foundUser) {
      setUser({ ...foundUser, lastActive: new Date().toISOString() });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) return;

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const newSale: Sale = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      items: [...cart],
      totalAmount,
      date: new Date().toISOString(),
    };

    // Decrease stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(c => c.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    setSales(prev => [...prev, newSale]);
    setCart([]);
    setIsCartOpen(false);
    alert(`Thank you for your purchase, ${user.name}! Total: $${totalAmount.toFixed(2)}`);
  };

  // Admin Handlers
  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {user.role === UserRole.ADMIN ? (
          <div className="space-y-6">
             <div className="flex space-x-1 rounded-xl bg-gray-200 p-1 max-w-md mx-auto mb-8">
              <button
                onClick={() => setActiveAdminTab('inventory')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeAdminTab === 'inventory' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Inventory
              </button>
              <button
                onClick={() => setActiveAdminTab('financials')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeAdminTab === 'financials' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Financials
              </button>
              <button
                onClick={() => setActiveAdminTab('users')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeAdminTab === 'users' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                Users
              </button>
            </div>

            {activeAdminTab === 'inventory' && (
              <AdminInventory 
                products={products} 
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
            {activeAdminTab === 'financials' && <AdminFinancials sales={sales} />}
            {activeAdminTab === 'users' && <AdminUsers users={allUsers} />}
          </div>
        ) : (
          <div>
            <div className="mb-8 text-center">
               <h1 className="text-3xl font-bold text-gray-900">Featured Collection</h1>
               <p className="mt-2 text-gray-600">Curated items for your lifestyle</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;
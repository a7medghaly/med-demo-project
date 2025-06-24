import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'ADD_ALERT', payload: { type: 'success', message: 'تم تسجيل الخروج بنجاح' } });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-accent-500">متجر الصحة</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/products" className="text-gray-700 hover:text-primary-500 font-medium">
              المنتجات
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary-500" />
              {state.cart.totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.cart.totalQty}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {state.user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-sm text-gray-700">مرحباً، {state.user.name}</span>
                {state.user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-sm bg-accent-500 text-white px-3 py-1 rounded-md hover:bg-accent-600"
                  >
                    الإدارة
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-primary-500"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link to="/login" className="text-gray-700 hover:text-primary-500">
                  دخول
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  اشتراك
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-3">
              <Link
                to="/products"
                className="block text-gray-700 hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-gray-700 hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 ml-2" />
                السلة ({state.cart.totalQty})
              </Link>
              
              {state.user ? (
                <>
                  <div className="text-sm text-gray-700">مرحباً، {state.user.name}</div>
                  {state.user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block text-accent-500 hover:text-accent-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      الإدارة
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-gray-700 hover:text-primary-500 font-medium"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-primary-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    دخول
                  </Link>
                  <Link
                    to="/register"
                    className="block text-primary-500 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    اشتراك
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
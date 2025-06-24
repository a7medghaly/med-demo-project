import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import RatingStars from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity: 1 }
    });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: 'تم إضافة المنتج إلى السلة' }
    });
  };

  return (
    <div className="card group hover:shadow-md transition-shadow duration-200">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {product.originalPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          {product.stock < 10 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              كمية محدودة
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary-500 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <RatingStars rating={product.rating} />
          <span className="text-sm text-gray-500 mr-2">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-lg font-bold text-primary-500">
              {product.price} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice} ج.م
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded ${
            product.stock > 10 
              ? 'bg-green-100 text-green-700' 
              : product.stock > 0 
                ? 'bg-orange-100 text-orange-700'
                : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 10 ? 'متوفر' : product.stock > 0 ? 'كمية محدودة' : 'غير متوفر'}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center space-x-1 space-x-reverse bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>أضف</span>
          </button>
        </div>
      </div>
    </div>
  );
}
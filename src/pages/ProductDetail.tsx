import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumbs from '../components/Breadcrumbs';
import RatingStars from '../components/RatingStars';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  const product = state.products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h1>
          <Link to="/products" className="btn-primary">
            العودة للمنتجات
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: `تم إضافة ${quantity} من ${product.title} إلى السلة` }
    });
  };

  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs 
        items={[
          { label: 'المنتجات', href: '/products' },
          { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
          { label: product.title }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-accent-500 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600">رقم المنتج: {product.sku}</p>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <RatingStars rating={product.rating} size="md" showNumber />
            <span className="text-gray-600">({product.reviewCount} تقييم)</span>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-3xl font-bold text-primary-500">
              {product.price} ج.م
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                {product.originalPrice} ج.م
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="font-medium">الحالة:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 10 
                  ? 'bg-green-100 text-green-700' 
                  : product.stock > 0 
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
              }`}>
                {product.stock > 10 ? 'متوفر' : product.stock > 0 ? 'كمية محدودة' : 'غير متوفر'}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="font-medium">الكمية:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex space-x-4 space-x-reverse">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>أضف إلى السلة</span>
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
              <Truck className="h-5 w-5 text-primary-500" />
              <span>توصيل مجاني للطلبات أكثر من 500 ج.م</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
              <Shield className="h-5 w-5 text-primary-500" />
              <span>منتج معتمد ومضمون الجودة</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
              <RotateCcw className="h-5 w-5 text-primary-500" />
              <span>إمكانية الإرجاع خلال 14 يوم</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t pt-8">
        <div className="flex space-x-8 space-x-reverse border-b mb-6">
          {[
            { key: 'description', label: 'الوصف' },
            { key: 'ingredients', label: 'المكونات' },
            { key: 'reviews', label: 'التقييمات' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-2 font-medium ${
                activeTab === tab.key
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">وصف المنتج</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}
          
          {activeTab === 'ingredients' && (
            <div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">المكونات</h3>
              <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold text-accent-500 mb-4">التقييمات والمراجعات</h3>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600">لا توجد مراجعات بعد. كن أول من يقيم هذا المنتج!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
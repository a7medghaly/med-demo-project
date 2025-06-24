import React, { useState } from 'react';
import { Package, ShoppingCart, Users, Plus, Edit, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export default function Admin() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    ingredients: '',
    stock: '',
    image: '',
    sku: ''
  });

  // Redirect if not admin
  if (!state.user || state.user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">غير مصرح لك بالوصول</h1>
          <p className="text-gray-600">هذه الصفحة متاحة للمدراء فقط</p>
        </div>
      </div>
    );
  }

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      title: productForm.title,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      image: productForm.image || 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400',
      images: [productForm.image || 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400'],
      category: productForm.category,
      description: productForm.description,
      ingredients: productForm.ingredients,
      stock: parseInt(productForm.stock),
      rating: editingProduct?.rating || 4.5,
      reviewCount: editingProduct?.reviewCount || 0,
      sku: productForm.sku,
      featured: editingProduct?.featured || false
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = state.products.map(p => 
        p.id === editingProduct.id ? newProduct : p
      );
      dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
      dispatch({
        type: 'ADD_ALERT',
        payload: { type: 'success', message: 'تم تحديث المنتج بنجاح' }
      });
    } else {
      // Add new product
      dispatch({ type: 'SET_PRODUCTS', payload: [...state.products, newProduct] });
      dispatch({
        type: 'ADD_ALERT',
        payload: { type: 'success', message: 'تم إضافة المنتج بنجاح' }
      });
    }

    // Reset form
    setProductForm({
      title: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      ingredients: '',
      stock: '',
      image: '',
      sku: ''
    });
    setEditingProduct(null);
    setShowProductModal(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      description: product.description,
      ingredients: product.ingredients,
      stock: product.stock.toString(),
      image: product.image,
      sku: product.sku
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const updatedProducts = state.products.filter(p => p.id !== id);
      dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
      dispatch({
        type: 'ADD_ALERT',
        payload: { type: 'success', message: 'تم حذف المنتج بنجاح' }
      });
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      ingredients: '',
      stock: '',
      image: '',
      sku: ''
    });
    setShowProductModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-accent-500">لوحة التحكم</h1>
        <div className="text-sm text-gray-600">
          مرحباً، {state.user.name}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center">
            <Package className="h-12 w-12 text-primary-500" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-gray-800">{state.products.length}</p>
              <p className="text-gray-600">المنتجات</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-12 w-12 text-green-500" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-gray-600">الطلبات</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center">
            <Users className="h-12 w-12 text-blue-500" />
            <div className="mr-4">
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-gray-600">المستخدمين</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 space-x-reverse">
          {[
            { key: 'products', label: 'المنتجات', icon: Package },
            { key: 'orders', label: 'الطلبات', icon: ShoppingCart },
            { key: 'users', label: 'المستخدمين', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 space-x-reverse py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-accent-500">إدارة المنتجات</h2>
            <button
              onClick={openNewProductModal}
              className="btn-primary flex items-center space-x-2 space-x-reverse"
            >
              <Plus className="h-4 w-4" />
              <span>منتج جديد</span>
            </button>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      المنتج
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      السعر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      المخزون
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-10 w-10 rounded-md object-cover ml-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price} ج.م
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="card p-6 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد طلبات بعد</h3>
          <p className="text-gray-600">ستظهر الطلبات هنا عند إتمام العملاء لعمليات الشراء</p>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="card p-6 text-center">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">إدارة المستخدمين</h3>
          <p className="text-gray-600">ستظهر قائمة المستخدمين المسجلين هنا</p>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-accent-500">
                {editingProduct ? 'تعديل المنتج' : 'منتج جديد'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={productForm.title}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم المنتج (SKU) *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={productForm.sku}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    السعر *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    step="0.01"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    السعر الأصلي (اختياري)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    step="0.01"
                    value={productForm.originalPrice}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الفئة *
                  </label>
                  <select
                    name="category"
                    required
                    value={productForm.category}
                    onChange={handleProductFormChange}
                    className="input-field"
                  >
                    <option value="">اختر الفئة</option>
                    <option value="أجهزة طبية">أجهزة طبية</option>
                    <option value="مكملات غذائية">مكملات غذائية</option>
                    <option value="العناية الشخصية">العناية الشخصية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المخزون *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    required
                    value={productForm.stock}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={productForm.image}
                    onChange={handleProductFormChange}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوصف *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المكونات *
                  </label>
                  <textarea
                    name="ingredients"
                    required
                    rows={2}
                    value={productForm.ingredients}
                    onChange={handleProductFormChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 space-x-reverse pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'تحديث' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
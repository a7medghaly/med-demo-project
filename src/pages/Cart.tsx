import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: 'تم حذف المنتج من السلة' }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: 'تم مسح السلة' }
    });
  };

  const subtotal = state.cart.totalPrice;
  const vat = subtotal * 0.14; // 14% VAT
  const total = subtotal + vat;

  if (state.cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'السلة' }]} />
        
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">سلة التسوق فارغة</h2>
          <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <Link to="/products" className="btn-primary">
            تسوق الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'السلة' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-accent-500">سلة التسوق</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          مسح السلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.cart.items.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-primary-500 font-semibold">{item.price} ج.م</p>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-center min-w-[6rem]">
                    <p className="font-semibold text-gray-800">
                      {(item.price * item.quantity).toFixed(2)} ج.م
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-accent-500 mb-4">ملخص الطلب</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-medium">{subtotal.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ضريبة القيمة المضافة (14%)</span>
                <span className="font-medium">{vat.toFixed(2)} ج.م</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>الإجمالي</span>
                  <span className="text-primary-500">{total.toFixed(2)} ج.م</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>تابع الدفع</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
              
              <Link
                to="/products"
                className="w-full btn-secondary text-center block"
              >
                متابعة التسوق
              </Link>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-md">
              <p className="text-green-700 text-sm font-medium">
                🚚 توصيل مجاني للطلبات أكثر من 500 ج.م
              </p>
              {subtotal < 500 && (
                <p className="text-green-600 text-xs mt-1">
                  أضف {(500 - subtotal).toFixed(2)} ج.م أكثر للحصول على توصيل مجاني
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
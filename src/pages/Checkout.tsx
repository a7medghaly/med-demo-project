import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'vodafone'
  });

  const subtotal = state.cart.totalPrice;
  const vat = subtotal * 0.14;
  const total = subtotal + vat;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order Placed:', { formData, items: state.cart.items, total });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: 'تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً.' }
    });
  };

  if (state.cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">السلة فارغة</h1>
          <Link to="/products" className="btn-primary">
            العودة للتسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs 
        items={[
          { label: 'السلة', href: '/cart' },
          { label: 'الدفع' }
        ]} 
      />

      <h1 className="text-2xl font-bold text-accent-500 mb-8">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {/* Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="mr-2 font-medium">معلومات الشحن</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-4"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="mr-2 font-medium">طريقة الدفع</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-accent-500 mb-4">معلومات الشحن</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأول *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأخير *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      العنوان *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المدينة *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الرقم البريدي
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-accent-500 mb-4">طريقة الدفع</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="vodafone"
                      checked={formData.paymentMethod === 'vodafone'}
                      onChange={handleInputChange}
                      className="ml-3"
                    />
                    <Smartphone className="h-6 w-6 text-red-600 ml-3" />
                    <div>
                      <p className="font-medium">فودافون كاش</p>
                      <p className="text-sm text-gray-600">ادفع باستخدام محفظة فودافون</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="etisalat"
                      checked={formData.paymentMethod === 'etisalat'}
                      onChange={handleInputChange}
                      className="ml-3"
                    />
                    <Smartphone className="h-6 w-6 text-orange-600 ml-3" />
                    <div>
                      <p className="font-medium">اتصالات كاش</p>
                      <p className="text-sm text-gray-600">ادفع باستخدام محفظة اتصالات</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="ml-3"
                    />
                    <CreditCard className="h-6 w-6 text-blue-600 ml-3" />
                    <div>
                      <p className="font-medium">بطاقة ائتمانية</p>
                      <p className="text-sm text-gray-600">فيزا أو ماستر كارد</p>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex items-center space-x-2 space-x-reverse"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>السابق</span>
                  </button>
                  
                  <button type="submit" className="btn-primary">
                    تأكيد الطلب
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-accent-500 mb-4">ملخص الطلب</h2>
            
            <div className="space-y-3 mb-4">
              {state.cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} ج.م</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span>{subtotal.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ضريبة القيمة المضافة</span>
                <span>{vat.toFixed(2)} ج.م</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>الإجمالي</span>
                <span className="text-primary-500">{total.toFixed(2)} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
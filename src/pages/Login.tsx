import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    const user = {
      uid: '1',
      email: formData.email,
      name: formData.email.split('@')[0],
      role: formData.email === 'admin@example.com' ? 'admin' as const : 'user' as const
    };

    dispatch({ type: 'SET_USER', payload: user });
    dispatch({
      type: 'ADD_ALERT',
      payload: { type: 'success', message: `مرحباً ${user.name}! تم تسجيل الدخول بنجاح` }
    });
    
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent-500">تسجيل الدخول</h2>
          <p className="mt-2 text-gray-600">
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
              اشترك الآن
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="أدخل بريدك الإلكتروني"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10 pl-10"
                  placeholder="أدخل كلمة المرور"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="ml-2" />
                <span className="text-sm text-gray-600">تذكرني</span>
              </label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button type="submit" className="w-full btn-primary">
              تسجيل الدخول
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">للاختبار، يمكنك استخدام:</p>
          <p>المدير: admin@example.com</p>
          <p>المستخدم العادي: user@example.com</p>
          <p>كلمة المرور: أي شيء</p>
        </div>
      </div>
    </div>
  );
}
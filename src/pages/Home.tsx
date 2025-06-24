import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Stethoscope, Pill, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { state } = useApp();
  const featuredProducts = state.products.filter(product => product.featured).slice(0, 4);

  const categories = [
    {
      name: 'أجهزة طبية',
      icon: Stethoscope,
      description: 'أجهزة طبية معتمدة وموثوقة',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'مكملات غذائية',
      icon: Pill,
      description: 'فيتامينات ومكملات عالية الجودة',
      image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'العناية الشخصية',
      icon: Shield,
      description: 'منتجات العناية والحماية الصحية',
      image: 'https://images.pexels.com/photos/3683073/pexels-photo-3683073.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-primary-50 to-accent-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold text-accent-500 mb-6">
                صحتك
                <span className="text-primary-500"> أولويتنا</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                اكتشف مجموعة واسعة من المنتجات الطبية والصحية المعتمدة من أفضل الماركات العالمية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-colors space-x-2 space-x-reverse"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>تسوّق الآن</span>
                </Link>
                <Link
                  to="/products?category=أجهزة طبية"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-50 text-accent-500 font-semibold rounded-md border-2 border-accent-500 transition-colors"
                >
                  اكتشف الأجهزة الطبية
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical Equipment"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">معتمد طبياً</p>
                    <p className="text-xs text-gray-500">منتجات موثوقة 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent-500 mb-4">المنتجات المميزة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختيارنا من أفضل المنتجات الطبية والصحية الأكثر طلباً
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold space-x-2 space-x-reverse"
            >
              <span>عرض جميع المنتجات</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-accent-500 mb-4">تسوق حسب الفئة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من المنتجات الطبية والصحية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <div className="card hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 right-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-accent-500 mb-2 group-hover:text-primary-500 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">منتجات معتمدة</h3>
              <p className="text-gray-300">جميع منتجاتنا معتمدة طبياً وموثوقة</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-gray-300">توصيل مجاني للطلبات أكثر من 500 جنيه</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">استشارة طبية</h3>
              <p className="text-gray-300">فريق من الخبراء الطبيين لمساعدتك</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
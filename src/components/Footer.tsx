import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Heart className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">متجر الصحة</span>
            </div>
            <p className="text-gray-300 mb-4">
              متجرك الموثوق للمنتجات الطبية والصحية. نقدم أفضل المنتجات بأعلى معايير الجودة والأمان.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-400">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-primary-400">
                  السلة
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400">
                  من نحن
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الفئات</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=أجهزة طبية" className="text-gray-300 hover:text-primary-400">
                  أجهزة طبية
                </Link>
              </li>
              <li>
                <Link to="/products?category=مكملات غذائية" className="text-gray-300 hover:text-primary-400">
                  مكملات غذائية
                </Link>
              </li>
              <li>
                <Link to="/products?category=العناية الشخصية" className="text-gray-300 hover:text-primary-400">
                  العناية الشخصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">القاهرة، مصر</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+20 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@health-store.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 متجر الصحة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
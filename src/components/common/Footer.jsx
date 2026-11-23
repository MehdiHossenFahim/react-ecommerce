import React from 'react';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Free Fast Shipping</h4>
                <p className="text-xs text-slate-400">On all orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Secure Checkout</h4>
                <p className="text-xs text-slate-400">100% Protected Payments</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">30 Days Return</h4>
                <p className="text-xs text-slate-400">Hassle-free guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
                <p className="text-xs text-slate-400">Dedicated help desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Swift<span className="text-indigo-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your premier online shopping destination. Crafted with React.js and Redux Toolkit for seamless, reactive shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-indigo-400 transition">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400 hover:text-indigo-400 transition cursor-pointer">
                Electronics
              </li>
              <li className="text-slate-400 hover:text-indigo-400 transition cursor-pointer">
                Jewelery
              </li>
              <li className="text-slate-400 hover:text-indigo-400 transition cursor-pointer">
                Men's Clothing
              </li>
              <li className="text-slate-400 hover:text-indigo-400 transition cursor-pointer">
                Women's Clothing
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Built With
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Powered by modern frontend web technologies:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-indigo-300 border border-slate-700">
                React 19
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-purple-300 border border-slate-700">
                Redux Toolkit
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-sky-300 border border-slate-700">
                React Router 7
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                Tailwind CSS
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-emerald-300 border border-slate-700">
                FakeStore API
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SwiftShop E-Commerce. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Developed by</span>
            <span className="text-white font-semibold hover:text-indigo-400 transition">Mehedi Hossen Fahim</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

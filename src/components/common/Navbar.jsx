import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalCount } from '../../redux/slices/cartSlice';
import { selectWishlistCount } from '../../redux/slices/wishlistSlice';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Home,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useSelector(selectCartTotalCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-indigo-50 text-indigo-600 shadow-sm'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/70'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-slate-700 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Application Name */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Swift<span className="text-indigo-600">Shop</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                E-Commerce
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink to="/" end className={navLinkClasses}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/wishlist" className={navLinkClasses}>
              <div className="relative flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-600 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink to="/cart" className={navLinkClasses}>
              <div className="relative flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>Cart</span>
                <span
                  className={`ml-1.5 px-2 py-0.5 text-xs font-extrabold rounded-full transition-transform ${
                    cartCount > 0
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/40 animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                  data-testid="cart-count-badge"
                >
                  {cartCount}
                </span>
              </div>
            </NavLink>
          </nav>

          {/* Quick Action Buttons for Cart in mobile / header */}
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition md:hidden"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 md:hidden transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-fade-in shadow-xl">
          <nav className="flex flex-col gap-1.5">
            <NavLink
              to="/"
              end
              className={mobileNavLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-indigo-600" />
                <span>Home</span>
              </div>
            </NavLink>

            <NavLink
              to="/wishlist"
              className={mobileNavLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-600 rounded-full">
                  {wishlistCount} saved
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={mobileNavLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                <span>Shopping Cart</span>
              </div>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-600 text-white rounded-full">
                {cartCount} items
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

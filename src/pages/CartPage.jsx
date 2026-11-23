import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalCount } from '../redux/slices/cartSlice';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCount = useSelector(selectCartTotalCount);

  const isEmpty = cartItems.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Shopping Cart</span>
            {!isEmpty && (
              <span className="text-sm font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected items and proceed to secure checkout.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Cart Content: Empty State vs. Item List & Order Summary */}
      {isEmpty ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-sm my-8">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            Looks like you haven't added any products to your cart yet. Explore our wide range of products and discover great deals today!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all duration-200"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Bottom Actions */}
            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add more items</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar (1 col) */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

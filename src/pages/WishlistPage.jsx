import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToast } from '../redux/slices/uiSlice';
import { formatPrice, formatCategory } from '../utils/formatters';
import { Heart, ShoppingCart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const isEmpty = wishlistItems.length === 0;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(
      addToast({
        message: `Added "${product.title.slice(0, 25)}..." to your cart!`,
        type: 'success',
      })
    );
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromWishlist(id));
    dispatch(
      addToast({
        message: `Removed "${title.slice(0, 25)}..." from wishlist`,
        type: 'info',
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>My Wishlist</span>
            {!isEmpty && (
              <span className="text-sm font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Products you saved for later. Move them to your cart when you're ready!
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

      {isEmpty ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-sm my-8">
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
            You haven't saved any items to your wishlist yet. Tap the heart icon on any product card to bookmark your favorites!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all duration-200"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="relative">
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {formatCategory(product.category)}
                  </span>
                  <button
                    onClick={() => handleRemove(product.id, product.title)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-rose-500 hover:bg-rose-50 transition shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full h-48 pt-6 pb-2 overflow-hidden rounded-xl"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-sm font-semibold text-slate-800 hover:text-indigo-600 transition line-clamp-2 mt-2"
                >
                  {product.title}
                </Link>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-base font-black text-slate-900">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

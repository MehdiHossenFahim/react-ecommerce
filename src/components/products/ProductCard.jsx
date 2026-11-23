import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../../redux/slices/cartSlice';
import { toggleWishlist, selectWishlistItems } from '../../redux/slices/wishlistSlice';
import { addToast } from '../../redux/slices/uiSlice';
import { formatPrice, formatCategory } from '../../utils/formatters';
import { ShoppingCart, Heart, Star, Check, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart(product));
    dispatch(
      addToast({
        message: `Added "${product.title.slice(0, 25)}..." to your cart!`,
        type: 'success',
      })
    );
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlist(product));
    dispatch(
      addToast({
        message: isInWishlist
          ? `Removed from your wishlist`
          : `Saved to your wishlist!`,
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  return (
    <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top badges: Category & Wishlist */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-10">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            {formatCategory(product.category)}
          </span>
        </div>

        {/* Wishlist toggle button (Bonus Feature) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-0 right-0 z-10 p-2 rounded-xl transition-all duration-200 shadow-sm ${
            isInWishlist
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isInWishlist ? 'fill-rose-500' : ''
            }`}
          />
        </button>

        {/* Product Image with link to Details */}
        <Link
          to={`/product/${product.id}`}
          className="block w-full h-56 pt-6 pb-2 overflow-hidden rounded-xl cursor-pointer group-hover:opacity-95"
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {product.rating?.rate || 4.5}
            </span>
            <span className="text-xs text-slate-400">
              ({product.rating?.count || 120})
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        {/* Bottom Section: Price & Add to Cart */}
        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 block -mb-0.5">Price</span>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 hover:shadow-md'
            }`}
            title="Add to Cart"
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Cart ({cartItem.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

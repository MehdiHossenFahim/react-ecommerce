import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { addToCart, selectCartItems } from '../redux/slices/cartSlice';
import { toggleWishlist, selectWishlistItems } from '../redux/slices/wishlistSlice';
import { addToast } from '../redux/slices/uiSlice';
import { formatPrice, formatCategory } from '../utils/formatters';
import ProductCard from '../components/products/ProductCard';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  AlertCircle,
  Share2,
} from 'lucide-react';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);

  const cartItem = product ? cartItems.find((item) => item.id === product.id) : null;
  const isInWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      setQuantity(1);
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);

        // Fetch related products from same category
        if (productData.category) {
          const categoryProducts = await fetchProductsByCategory(productData.category);
          setRelatedProducts(categoryProducts.filter((item) => item.id !== Number(id)).slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message || 'Product details could not be loaded.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );
    dispatch(
      addToast({
        message: `Added ${quantity} × "${product.title.slice(0, 25)}..." to cart!`,
        type: 'success',
      })
    );
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
    dispatch(
      addToast({
        message: isInWishlist ? 'Removed from your wishlist' : 'Added to your wishlist!',
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      addToast({
        message: 'Product link copied to clipboard!',
        type: 'info',
      })
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
        <div className="w-32 h-6 bg-slate-200 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-[460px] bg-slate-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="w-24 h-6 bg-slate-200 rounded-full"></div>
            <div className="w-3/4 h-8 bg-slate-200 rounded-lg"></div>
            <div className="w-32 h-6 bg-slate-200 rounded-md"></div>
            <div className="w-full h-32 bg-slate-200 rounded-2xl"></div>
            <div className="w-1/2 h-10 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          {error || "The product you're looking for doesn't exist or has been removed."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="capitalize">{formatCategory(product.category)}</span>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Details Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column: Product Image Gallery */}
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-8 border border-slate-100 relative group">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[420px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* Wishlist Button inside Image Container */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-2xl shadow-md transition ${
                isInWishlist
                  ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  : 'bg-white text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 rounded-lg">
                  {formatCategory(product.category)}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg text-amber-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{product.rating?.rate || 4.5}</span>
                </div>
                <span className="text-xs text-slate-500">
                  Based on {product.rating?.count || 120} customer reviews
                </span>
                <button
                  onClick={handleCopyLink}
                  className="ml-auto text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Price display */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                  Limited Time Price
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.price * 1.25)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-600">
                    Save 20%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Product Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed capitalize-first">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center justify-between border border-slate-200 rounded-xl bg-slate-50 p-1.5 w-full sm:w-36">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-100 disabled:opacity-40 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-extrabold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    Add to Cart • {formatPrice(product.price * quantity)}
                  </span>
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              {/* Already in cart banner */}
              {cartItem && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>
                    You already have {cartItem.quantity} of this item in your{' '}
                    <Link to="/cart" className="underline font-bold hover:text-emerald-950">
                      cart
                    </Link>
                    .
                  </span>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="flex flex-col items-center gap-1 p-2">
                  <Truck className="w-5 h-5 text-indigo-600" />
                  <span className="text-[11px] font-semibold text-slate-600">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-semibold text-slate-600">Authentic Guaranteed</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                  <span className="text-[11px] font-semibold text-slate-600">30-Day Free Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Related Products in {formatCategory(product.category)}
              </h2>
              <p className="text-xs text-slate-500">Customers who viewed this also loved</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;

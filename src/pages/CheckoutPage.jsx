import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotalCount,
  clearCart,
} from '../redux/slices/cartSlice';
import { addToast } from '../redux/slices/uiSlice';
import { formatPrice } from '../utils/formatters';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const totalCount = useSelector(selectCartTotalCount);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      dispatch(addToast({ message: 'Your cart is empty!', type: 'warning' }));
      return;
    }

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      dispatch(addToast({ message: 'Please complete all required fields.', type: 'error' }));
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      setIsSubmitting(false);
      setOrderPlaced(true);

      // Clear cart in Redux (which also syncs to LocalStorage)
      dispatch(clearCart());
      dispatch(addToast({ message: 'Order placed successfully! 🎉', type: 'success' }));
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Payment Confirmed
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            We have received your order and our team is already packaging it with care.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left mb-8 space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-extrabold text-indigo-600 font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Delivering To:</span>
              <span className="font-semibold text-slate-800">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Shipping Address:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                {formData.address}, {formData.city}
              </span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-800">Total Paid:</span>
              <span className="font-extrabold text-slate-900">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 mb-6">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-sm text-slate-500">Provide shipping and payment information to complete your order.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form (2 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>1. Shipping Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street, Apt 4B"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  State / Province *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  ZIP / Postal Code *
                </label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <span>2. Payment Method</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="text-indigo-600"
                />
                <span className="text-sm font-bold text-slate-800">Credit / Debit Card</span>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="text-indigo-600"
                />
                <span className="text-sm font-bold text-slate-800">Cash on Delivery</span>
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="4000 1234 5678 9010"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Securing and Placing Your Order...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Place Order • {formatPrice(grandTotal)}</span>
              </>
            )}
          </button>
        </form>

        {/* Order Summary Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Review ({totalCount} items)
            </h3>

            {/* List of items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 object-contain rounded bg-slate-50 p-1 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{item.title}</p>
                    <p className="text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span className="font-semibold text-slate-800">
                  {shipping === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax:</span>
                <span className="font-semibold text-slate-800">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-100">
                <span>Order Total:</span>
                <span className="text-indigo-600 text-base">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-3 text-xs text-indigo-900">
            <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
            <span>All transactions are encrypted with bank-level SSL security.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

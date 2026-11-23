import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartSubtotal,
  selectCartTotalCount,
} from '../../redux/slices/cartSlice';
import { openConfirmationModal, addToast } from '../../redux/slices/uiSlice';
import { formatPrice } from '../../utils/formatters';
import {
  ShieldCheck,
  ArrowRight,
  Trash2,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export const OrderSummary = ({ onCheckout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = useSelector(selectCartSubtotal);
  const totalCount = useSelector(selectCartTotalCount);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');

  // Shipping logic: Free shipping if subtotal > 50, otherwise $4.99
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const discountAmount = (subtotal * discountPercent) / 100;
  // Tax 8%
  const tax = ((subtotal - discountAmount) * 0.08);
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();

    if (code === 'SWIFT10') {
      setDiscountPercent(10);
      setAppliedPromo('SWIFT10 (10% OFF)');
      setPromoCode('');
      dispatch(addToast({ message: 'Promo code SWIFT10 applied: 10% OFF!', type: 'success' }));
    } else if (code === 'SAVE20') {
      setDiscountPercent(20);
      setAppliedPromo('SAVE20 (20% OFF)');
      setPromoCode('');
      dispatch(addToast({ message: 'Promo code SAVE20 applied: 20% OFF!', type: 'success' }));
    } else {
      dispatch(addToast({ message: 'Invalid coupon code. Try SWIFT10 or SAVE20', type: 'error' }));
    }
  };

  const handleClearCart = () => {
    dispatch(
      openConfirmationModal({
        title: 'Clear Shopping Cart',
        message: 'Are you sure you want to remove all items from your shopping cart?',
        confirmText: 'Clear All',
        actionType: 'CLEAR_CART',
        payload: null,
      })
    );
  };

  const handleProceedToCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5 sticky top-24">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      {/* Item summary details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'}):</span>
          <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
        </div>

        {discountPercent > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Discount ({appliedPromo}):
            </span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Shipping:</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-600 font-semibold">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Estimated Tax (8%):</span>
          <span className="text-slate-800">{formatPrice(tax)}</span>
        </div>

        {subtotal < 50 && subtotal > 0 && (
          <p className="text-xs text-indigo-600 bg-indigo-50 p-2.5 rounded-xl">
            Add <span className="font-bold">{formatPrice(50 - subtotal)}</span> more to qualify for <strong>FREE Shipping!</strong>
          </p>
        )}
      </div>

      {/* Promo Code Form */}
      <form onSubmit={handleApplyPromo} className="pt-2 border-t border-slate-100">
        <label className="text-xs font-semibold text-slate-500 block mb-1.5">
          Have a promo code? (Try: SWIFT10)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo Code"
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 uppercase font-semibold"
          />
          <button
            type="submit"
            className="px-3 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition"
          >
            Apply
          </button>
        </div>
      </form>

      {/* Total calculation */}
      <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-600 block">Total Amount</span>
          <span className="text-xs text-slate-400">Includes VAT & Taxes</span>
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          {formatPrice(finalTotal)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleProceedToCheckout}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all duration-200"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleClearCart}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Shopping Cart</span>
        </button>
      </div>

      {/* Safe Guarantee */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Bank-grade 256-bit SSL encrypted checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;

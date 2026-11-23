import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/slices/cartSlice';
import { openConfirmationModal } from '../../redux/slices/uiSlice';
import { formatPrice, formatCategory } from '../../utils/formatters';
import { Plus, Minus, Trash2 } from 'lucide-react';

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      // Show confirmation before removing when quantity drops from 1 to 0
      dispatch(
        openConfirmationModal({
          title: 'Remove Item',
          message: `Are you sure you want to remove "${item.title}" from your shopping cart?`,
          confirmText: 'Remove',
          actionType: 'REMOVE_FROM_CART',
          payload: { id: item.id, title: item.title },
        })
      );
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleRemove = () => {
    // Show confirmation dialog before removing product (Bonus Requirement)
    dispatch(
      openConfirmationModal({
        title: 'Remove Item',
        message: `Are you sure you want to remove "${item.title}" from your shopping cart?`,
        confirmText: 'Remove',
        actionType: 'REMOVE_FROM_CART',
        payload: { id: item.id, title: item.title },
      })
    );
  };

  const itemSubtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition duration-200">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
        <Link
          to={`/product/${item.id}`}
          className="w-20 h-20 sm:w-24 sm:h-24 p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0 hover:opacity-90 transition"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-1">
            {formatCategory(item.category)}
          </span>
          <Link
            to={`/product/${item.id}`}
            className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition block truncate"
            title={item.title}
          >
            {item.title}
          </Link>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit Price: <span className="font-semibold text-slate-700">{formatPrice(item.price)}</span>
          </p>
        </div>
      </div>

      {/* Quantity Stepper & Price Calculation */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:text-indigo-600 hover:bg-slate-100 shadow-sm transition active:scale-90"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-800" data-testid="item-quantity">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 hover:text-indigo-600 hover:bg-slate-100 shadow-sm transition active:scale-90"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price for item */}
        <div className="text-right min-w-[90px]">
          <span className="text-xs text-slate-400 block -mb-0.5">Total</span>
          <span className="text-base font-black text-slate-900 tracking-tight">
            {formatPrice(itemSubtotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
          title="Remove from cart"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

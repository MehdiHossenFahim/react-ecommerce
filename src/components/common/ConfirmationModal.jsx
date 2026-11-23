import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectConfirmationModal,
  closeConfirmationModal,
  addToast,
} from '../../redux/slices/uiSlice';
import { removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    actionType,
    payload,
  } = useSelector(selectConfirmationModal);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (actionType === 'REMOVE_FROM_CART') {
      dispatch(removeFromCart(payload.id));
      dispatch(
        addToast({
          message: `"${payload.title || 'Item'}" removed from cart`,
          type: 'info',
        })
      );
    } else if (actionType === 'CLEAR_CART') {
      dispatch(clearCart());
      dispatch(
        addToast({
          message: 'All items removed from your shopping cart',
          type: 'info',
        })
      );
    }
    dispatch(closeConfirmationModal());
  };

  const handleCancel = () => {
    dispatch(closeConfirmationModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-rose-50 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={handleCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4">
          <p className="text-slate-600 leading-relaxed text-sm">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-md shadow-rose-600/20"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

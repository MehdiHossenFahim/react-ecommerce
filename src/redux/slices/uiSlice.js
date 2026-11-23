import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [], // array of { id, message, type: 'success' | 'info' | 'warning' | 'error' }
  confirmationModal: {
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    actionType: null, // identifier for action to take
    payload: null,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      const newToast = {
        id,
        message: typeof action.payload === 'string' ? action.payload : action.payload.message,
        type: typeof action.payload === 'object' && action.payload.type ? action.payload.type : 'success',
      };
      state.toasts.push(newToast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openConfirmationModal: (state, action) => {
      state.confirmationModal = {
        isOpen: true,
        title: action.payload.title || 'Are you sure?',
        message: action.payload.message || 'Do you want to proceed?',
        confirmText: action.payload.confirmText || 'Confirm',
        cancelText: action.payload.cancelText || 'Cancel',
        actionType: action.payload.actionType,
        payload: action.payload.payload,
      };
    },
    closeConfirmationModal: (state) => {
      state.confirmationModal = {
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        actionType: null,
        payload: null,
      };
    },
  },
});

export const {
  addToast,
  removeToast,
  openConfirmationModal,
  closeConfirmationModal,
} = uiSlice.actions;

export const selectToasts = (state) => state.ui.toasts;
export const selectConfirmationModal = (state) => state.ui.confirmationModal;

export default uiSlice.reducer;

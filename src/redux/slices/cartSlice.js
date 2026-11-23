import { createSlice } from '@reduxjs/toolkit';
import { loadCartFromStorage, saveCartToStorage } from '../../utils/localStorage';

const initialState = {
  cartItems: loadCartFromStorage(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. addToCart: Add a product to the shopping cart
    addToCart: (state, action) => {
      const payload = action.payload;
      const product = payload.product || payload;
      const addQty = payload.quantity && Number.isInteger(payload.quantity) ? payload.quantity : 1;

      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += addQty;
      } else {
        state.cartItems.push({
          ...product,
          quantity: addQty,
        });
      }
      saveCartToStorage(state.cartItems);
    },

    // 2. removeFromCart: Remove a product from the shopping cart
    removeFromCart: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      saveCartToStorage(state.cartItems);
    },

    // 3. increaseQuantity: Increase the quantity of a selected product
    increaseQuantity: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state.cartItems);
    },

    // 4. decreaseQuantity: Decrease the quantity of a selected product
    decreaseQuantity: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity is 1 and user decreases, remove item
          state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
        }
      }
      saveCartToStorage(state.cartItems);
    },

    // 5. clearCart: Remove all products from the shopping cart
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
  },
});

// Export reducers actions as required
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalCount = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;

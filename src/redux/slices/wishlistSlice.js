import { createSlice } from '@reduxjs/toolkit';
import { loadWishlistFromStorage, saveWishlistToStorage } from '../../utils/localStorage';

const initialState = {
  items: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      saveWishlistToStorage(state.items);
    },
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = typeof action.payload === 'object' ? action.payload.id : action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

export default wishlistSlice.reducer;

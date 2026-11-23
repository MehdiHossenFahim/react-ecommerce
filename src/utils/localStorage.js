const CART_STORAGE_KEY = 'swift_shop_cart';
const WISHLIST_STORAGE_KEY = 'swift_shop_wishlist';

export const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

export const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadWishlistFromStorage = () => {
  try {
    const serialized = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error);
    return [];
  }
};

export const saveWishlistToStorage = (wishlistItems) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }
};

# SwiftShop - React & Redux Toolkit E-Commerce Application

An elegant, fully-featured, responsive E-commerce shopping web application developed using **React.js**, **Redux Toolkit**, **React Router**, and **Tailwind CSS**, integrating the **FakeStore API**.

---

## 1. Project Name
**SwiftShop E-Commerce Application** (`react-ecommerce-assignment`)

---

## 2. Project Description
SwiftShop provides an intuitive, high-performance shopping experience allowing customers to browse a vast catalog of products, view comprehensive product details, search and filter products by category, sort by price, manage a persistent shopping cart with live calculations, bookmark favorites to a wishlist, and proceed through a complete checkout workflow.

State management is powered by **Redux Toolkit** using best practices (`configureStore`, `createSlice`, `useSelector`, and `useDispatch`), ensuring instant UI updates and seamless persistence across page reloads via `localStorage`.

---

## 3. Technologies Used
- **Frontend Framework:** React 19 (Hooks: `useState`, `useEffect`, `useMemo`, `useParams`, `useNavigate`)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS & Lucide React Icons
- **Build Tool:** Vite
- **API:** FakeStore REST API (`https://fakestoreapi.com`)
- **Persistence:** Browser `localStorage` API

---

## 4. Main Features

### A. Home Page
- **Dynamic API Product Catalog:** Fetches products from `https://fakestoreapi.com/products`.
- **Informative Product Cards:** Displays product image, title, price, category tag, rating stars/reviews, and an interactive **Add to Cart** button.
- **Responsive Grid:** Seamless layout across mobile (1 column), tablet (2-3 columns), and desktop (4 columns).
- **Loading Skeleton State:** High-fidelity shimmering skeleton cards while data is being fetched.
- **Error Handling:** Graceful error messages with a "Try Again" retry button if network issues occur.

### B. Product Details Page (`/product/:id`)
- **Complete Product Information:** High-resolution product image, title, category badge, detailed description, rating breakdown, and stock availability status.
- **Quantity Selector:** Allows users to select desired quantities before adding to the cart.
- **Direct Actions:** "Add to Cart" and quick "Buy Now" (which adds to cart and proceeds to checkout).
- **Wishlist Integration:** Quick bookmarking of favorite items directly from the product page.
- **Related Products:** Automatically showcases other products in the same category.

### C. Search, Filter & Sort Functionality
- **Instant Search:** Real-time search by product name with a clear button.
- **Category Filter:** Filter products by categories fetched from `https://fakestoreapi.com/products/categories` (Electronics, Jewelery, Men's Clothing, Women's Clothing).
- **Price & Rating Sorting:**
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
  - Featured (Default)
- **Active Filter Reset:** One-click reset to restore the full catalog view.

### D. Shopping Cart Management
- **Centralized Redux State:** Fully powered by Redux Toolkit's `cartSlice`.
- **Dynamic Cart Item Actions:**
  - `addToCart`: Add products or increase item quantities.
  - `removeFromCart`: Remove individual items from the cart.
  - `increaseQuantity`: Increment the quantity of an item.
  - `decreaseQuantity`: Decrement item quantity (with confirmation modal if reducing from 1).
  - `clearCart`: Clear the entire cart.
- **Live Price Calculation:** Computes accurate subtotal, estimated tax (8%), shipping fee (free above $50), discount savings, and final total.
- **Empty Cart State:** Engaging empty illustration with a direct "Start Shopping Now" CTA button.

### E. Navigation Bar
- Responsive navbar with mobile slide-out drawer.
- Brand logo and title.
- Direct links to **Home**, **Wishlist**, and **Cart**.
- **Real-Time Cart Badge:** Automatically displays and animates the updated item count whenever items are added or removed.
- **Wishlist Badge:** Shows the count of saved wishlist items.

---

## 5. Bonus Features Implemented

1. **Wishlist Management (`/wishlist`):**
   - Save favorite products for later.
   - Dedicated Wishlist page with "Move to Cart" and "Remove" options.
2. **LocalStorage Persistence:**
   - Both cart data and wishlist items are persisted to `localStorage` and restored automatically upon reload.
3. **Interactive Toast Notifications:**
   - Real-time animated toast alerts for user feedback (e.g. *"Added to cart"*, *"Removed from cart"*, *"Saved to wishlist"*).
4. **Checkout Page (`/checkout`):**
   - Clean checkout form with customer information, shipping address, and payment method selection.
   - Order review summary.
   - Simulated order processing animation with generated **Order Reference ID** and order confirmation receipt.
5. **Confirmation Dialog Modal:**
   - Modal prompt before removing items or clearing the entire shopping cart to prevent accidental deletions.
6. **Promo / Coupon Code System:**
   - Apply discount codes like `SWIFT10` (10% OFF) or `SAVE20` (20% OFF) on the cart and order summary.

---

## 6. Project Structure

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.jsx          # Individual cart item component
│   │   │   └── OrderSummary.jsx      # Summary sidebar with subtotal, tax, promo code
│   │   ├── common/
│   │   │   ├── ConfirmationModal.jsx # Confirmation dialog before deleting items
│   │   │   ├── Footer.jsx            # Responsive website footer
│   │   │   ├── Navbar.jsx            # Header with live cart & wishlist counter
│   │   │   └── ToastContainer.jsx    # Animated notification alerts
│   │   └── products/
│   │       ├── FilterBar.jsx         # Search, category filter & sorting toolbar
│   │       ├── ProductCard.jsx       # Responsive product card
│   │       └── ProductSkeleton.jsx   # Shimmer skeleton loader
│   ├── pages/
│   │   ├── CartPage.jsx              # Shopping cart page
│   │   ├── CheckoutPage.jsx          # Checkout & Order placement page
│   │   ├── HomePage.jsx              # Main catalog page with search & filter
│   │   ├── NotFoundPage.jsx          # 404 page
│   │   ├── ProductDetailsPage.jsx    # Full single product details & related items
│   │   └── WishlistPage.jsx          # Saved wishlist items page
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── cartSlice.js          # Cart slice with required reducers
│   │   │   ├── uiSlice.js            # Toasts & modal state management
│   │   │   └── wishlistSlice.js      # Wishlist state slice
│   │   └── store.js                  # Redux Toolkit store configuration
│   ├── services/
│   │   └── api.js                    # FakeStoreAPI client service
│   ├── utils/
│   │   ├── formatters.js             # Currency & text formatting utilities
│   │   └── localStorage.js           # Storage sync helpers
│   ├── App.jsx                       # Routing & app layout
│   ├── index.css                     # Tailwind CSS & custom styles
│   └── main.jsx                      # React entrypoint with Redux Provider
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 7. Redux Toolkit Implementation Details

The cart is managed via `@reduxjs/toolkit` with `configureStore` and `createSlice`:

```javascript
// src/redux/slices/cartSlice.js
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => { ... },
    removeFromCart: (state, action) => { ... },
    increaseQuantity: (state, action) => { ... },
    decreaseQuantity: (state, action) => { ... },
    clearCart: (state) => { ... },
  },
});
```

All components consume state through `useSelector` and dispatch actions using `useDispatch`:
- `selectCartItems`
- `selectCartTotalCount`
- `selectCartSubtotal`

---

## 8. Installation Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/react-ecommerce-assignment.git
   cd react-ecommerce-assignment
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## 9. How to Run the Project

### Development Server:
To start the local development server with hot-module reloading:
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:5173`

### Production Build:
To generate an optimized production bundle:
```bash
npm run build
```

### Preview Production Build:
To preview the generated production build locally:
```bash
npm run preview
```

---

## 10. Live Project Link (Deployment)
- **Live Demo:** [https://swiftshop-ecommerce.vercel.app](https://swiftshop-ecommerce.vercel.app) *(Deployable to Vercel or Netlify)*

---

## 11. Author & Submission Notes
- **Author:** Mehedi Hossen Fahim
- **Assignment:** E-Commerce Shopping Application (React.js & Redux Toolkit)
- **License:** MIT

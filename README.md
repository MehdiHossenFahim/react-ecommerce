# SwiftShop — E-Commerce Web App

A responsive e-commerce web application built using **React**, **Redux Toolkit**, and **Tailwind CSS**. Products are loaded dynamically from the **FakeStore API**, with support for live search, category filtering, price sorting, a persistent shopping cart, and a simulated checkout flow.

<p align="left">
  <a href="https://react-ecommerce-ten-vert.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Open_App-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo on Vercel" />
  </a>
</p>

---

## Overview

This project was built for an e-commerce shopping assignment to demonstrate core React concepts, component architecture, client-side routing with React Router, and state management using Redux Toolkit.

---

## Technologies Used

- **React 19** — Functional components, custom hooks (`useState`, `useEffect`, `useMemo`)
- **Redux Toolkit & React-Redux** — Centralized store, cart slice, wishlist slice, and UI state
- **React Router DOM (v7)** — Client-side page navigation (`/`, `/product/:id`, `/cart`, `/wishlist`, `/checkout`)
- **Tailwind CSS** — Responsive styling and layout
- **Lucide React** — Modern icons
- **Vite** — Fast frontend build tool
- **FakeStore API** — REST API endpoints for product and category data

---

## Key Features

### 1. Home Page & Product Browsing
- Fetches all products from `https://fakestoreapi.com/products` on initial load.
- Displays product image, title, price, category, rating, and an **Add to Cart** button.
- Responsive grid (1 column on mobile, up to 4 columns on desktop).
- Shimmer skeleton loaders while fetching data.
- Error banner with a retry button if the API fails to load.

### 2. Search, Filter & Sorting
- **Search by Name:** Real-time search with an instant clear button.
- **Category Filter:** Dynamic filter pills and dropdown fetched from `/products/categories`.
- **Sort by Price:**
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
- **Reset Button:** Quick way to reset search and filters back to default.

### 3. Product Details Page (`/product/:id`)
- Dedicated product view displaying full title, description, category, high-res image, and rating breakdown.
- Quantity selector allowing users to add multiple items at once.
- Direct "Buy Now" button that routes to checkout.
- Related products section showing other items from the same category.

### 4. Shopping Cart (`/cart`)
Cart state is managed entirely with **Redux Toolkit**:
- Increase or decrease item quantities.
- Remove individual items with a confirmation prompt.
- Subtotal, estimated tax (8%), shipping calculation (free over $50), and total price update live.
- Optional coupon support (try code `SWIFT10` or `SAVE20`).
- Clear cart button with confirmation modal.
- Friendly empty cart state with a direct link back to shop.

### 5. Navigation Bar
- Responsive navbar with a mobile drawer toggle.
- Real-time cart badge that increments and decrements dynamically.
- Wishlist counter for quick access to saved items.

### 6. Extras / Bonus Features
- **Wishlist Page (`/wishlist`):** Bookmark favorite items and move them to cart later.
- **LocalStorage Sync:** Cart and wishlist data persist across browser refreshes.
- **Toast Notifications:** Feedback messages when items are added, removed, or ordered.
- **Checkout Page (`/checkout`):** Simple form with shipping details, payment options, order review, and order confirmation receipt with an order ID.

---

## Redux Architecture

Cart operations are handled inside `src/redux/slices/cartSlice.js` using `createSlice`:

- `addToCart`: Adds an item or increments quantity if already in the cart.
- `removeFromCart`: Removes an item by id.
- `increaseQuantity`: Increments selected item's quantity.
- `decreaseQuantity`: Decrements quantity (removes if reduced from 1).
- `clearCart`: Resets the cart to empty.

The store is configured in `src/redux/store.js` using `configureStore()`. Components read state using `useSelector()` and trigger updates with `useDispatch()`.

---

## Project Structure

```text
src/
├── components/
│   ├── cart/            # CartItem and OrderSummary components
│   ├── common/          # Navbar, Footer, ToastContainer, ConfirmationModal
│   └── products/        # ProductCard, ProductSkeleton, FilterBar
├── pages/
│   ├── HomePage.jsx
│   ├── ProductDetailsPage.jsx
│   ├── CartPage.jsx
│   ├── WishlistPage.jsx
│   ├── CheckoutPage.jsx
│   └── NotFoundPage.jsx
├── redux/
│   ├── slices/          # cartSlice, wishlistSlice, uiSlice
│   └── store.js
├── services/
│   └── api.js           # API fetch helpers for FakeStore
├── utils/
│   ├── formatters.js    # Currency & text formatting
│   └── localStorage.js  # Storage persistence helpers
├── App.jsx
├── index.css
└── main.jsx
```

---

## Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MehdiHossenFahim/react-ecommerce.git
   cd react-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Author

- **Name:** Mehedi Hossen Fahim
- **GitHub:** [@MehdiHossenFahim](https://github.com/MehdiHossenFahim)
- **Project:** React & Redux Toolkit E-Commerce Assignment

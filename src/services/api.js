const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products
 */
export const fetchAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product #${id}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  if (!data || Object.keys(data).length === 0) {
    throw new Error(`Product #${id} not found.`);
  }
  return data;
};

/**
 * Fetch all product categories
 */
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category "${category}": ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

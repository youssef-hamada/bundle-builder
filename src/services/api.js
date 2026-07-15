// API service for making requests to the backend
const API_URL = "http://localhost:5000/api";

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};

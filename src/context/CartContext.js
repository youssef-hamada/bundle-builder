import React, { createContext, useMemo, useReducer } from "react";

export const CartContext = createContext({});

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id,
      );
      if (existingIndex !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity:
            updatedItems[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, cartItems: updatedItems };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
          },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product._id !== action.payload.productId,
        ),
      };
    case "UPDATE_QUANTITY": {
      const updatedItems = state.cartItems
        .map((item) =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        cartItems: updatedItems,
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    try {
      const savedCart = localStorage.getItem("bundleBuilderCart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    }
    return initial;
  });

  const addItem = (product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const saveCart = () => {
    try {
      localStorage.setItem("bundleBuilderCart", JSON.stringify(state));
      return true;
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
      return false;
    }
  };

  const totalItems = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [state.cartItems],
  );

  const totalPrice = useMemo(
    () =>
      state.cartItems.reduce(
        (sum, item) => sum + item.quantity * (item.product.price || 0),
        0,
      ),
    [state.cartItems],
  );

  const cartByCategory = useMemo(
    () =>
      state.cartItems.reduce((grouped, item) => {
        const category = item.product.category || "uncategorized";
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(item);
        return grouped;
      }, {}),
    [state.cartItems],
  );

  const value = {
    cartItems: state.cartItems,
    totalItems,
    totalPrice,
    cartByCategory,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    saveCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

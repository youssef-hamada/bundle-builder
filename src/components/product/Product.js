import React, { useContext, useState } from "react";
import "./product.css";
import { CartContext } from "../../context/CartContext";

const Product = ({ product }) => {
  const { cartItems, addItem, updateQuantity, removeItem } =
    useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState("white");

  // Find if this product with specific color is in cart
  const getCartEntry = (color) => {
    return cartItems.find(
      (item) => item.product._id === product._id && item.color === color,
    );
  };

  // Get current quantity for selected color
  const currentQty = selectedColor
    ? getCartEntry(selectedColor)?.quantity || 0
    : 0;

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);

    // Auto-add to cart when color is selected
    const existingEntry = getCartEntry(colorName);
    if (!existingEntry) {
      addItem(product, 1, colorName);
    }
  };

  const handleIncrease = () => {
    if (!selectedColor) {
      // If no color selected, select the first one
      const firstColor = product.colors?.[0] || "white";
      setSelectedColor(firstColor);
      addItem(product, 1, firstColor);
      return;
    }

    const existingEntry = getCartEntry(selectedColor);
    if (!existingEntry) {
      addItem(product, 1, selectedColor);
    } else {
      updateQuantity(product._id, existingEntry.quantity + 1, selectedColor);
    }
  };

  const handleDecrease = () => {
    if (!selectedColor) return;

    const existingEntry = getCartEntry(selectedColor);
    if (!existingEntry) return;

    if (existingEntry.quantity <= 1) {
      removeItem(product._id, selectedColor);
      // Optional: Clear selected color if item is removed
      // setSelectedColor(null);
    } else {
      updateQuantity(product._id, existingEntry.quantity - 1, selectedColor);
    }
  };

  // Get the image for selected color
  const getProductImage = () => {
    if (selectedColor && product.colors) {
      const colorObj = product.colors.find(
        (c) => typeof c === "object" && Object.keys(c)[0] === selectedColor,
      );
      if (colorObj) {
        const value = Object.values(colorObj)[0];
        if (typeof value === "string" && value.startsWith("http")) {
          return value;
        }
        return value || product.pic || "cam-5.jpg";
      }
    }
    return product.pic || "cam-5.jpg";
  };

  return (
    <div className="product-container">
      {product.save && (
        <div className="save">
          <p>save 20%</p>
        </div>
      )}
      <div className="product-img">
        <img src={getProductImage()} alt={product.name} />
      </div>

      <div className="product-body">
        <div className="product-header">
          <h3>{product.name}</h3>
        </div>

        <div className="product-desc">{product.desc}</div>

        <div className="colors">
          {product.colors &&
            product.colors.map((colorItem, idx) => {
              const isObject = colorItem && typeof colorItem === "object";
              const colorName = isObject
                ? Object.keys(colorItem)[0]
                : colorItem;
              const colorSrc = isObject
                ? Object.values(colorItem)[0]
                : product.pic;

              const isSelected = selectedColor === colorName;
              const cartEntry = getCartEntry(colorName);
              const hasInCart = cartEntry && cartEntry.quantity > 0;

              return (
                <div
                  key={idx}
                  className={`color ${isSelected ? "selected" : ""} ${hasInCart ? "in-cart" : ""}`}
                  onClick={() => handleColorSelect(colorName)}
                >
                  <div className="color-img">
                    <img src={colorSrc} alt={colorName} />
                  </div>
                  <p>{colorName}</p>
                  {hasInCart && (
                    <span className="color-quantity-badge">
                      {cartEntry.quantity}
                    </span>
                  )}
                </div>
              );
            })}
        </div>

        <div className="quan-price">
          <div className="quantity">
            <div
              className={`quan-dec ${currentQty <= 0 ? "disabled" : "active"}`}
              onClick={handleDecrease}
            >
              <p>-</p>
            </div>

            <div className="quan-num">
              <p>{currentQty}</p>
            </div>

            <div className="quan-inc active" onClick={handleIncrease}>
              <p>+</p>
            </div>
          </div>

          <div className="price">${product.price}</div>
        </div>

        {selectedColor && (
          <div className="selected-color-info">Selected: {selectedColor}</div>
        )}
      </div>
    </div>
  );
};

export default Product;

import React, { useContext } from "react";
import "./product.css";
import { CartContext } from "../../context/CartContext";

const Product = ({ product }) => {
  const { cartItems, addItem, updateQuantity, removeItem } =
    useContext(CartContext);
  const cartEntry = cartItems.find((item) => item.product._id === product._id);
  const currentQty = cartEntry?.quantity || 0;

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleIncrease = () => {
    if (currentQty === 0) {
      addItem(product, 1);
    } else {
      updateQuantity(product._id, currentQty + 1);
    }
  };

  const handleDecrease = () => {
    if (currentQty <= 1) {
      if (cartEntry) {
        removeItem(product._id);
      }
      return;
    }

    updateQuantity(product._id, currentQty - 1);
  };

  return (
    <div className="product-container">
      {product.save && (
        <div className="save">
          <p>save 20%</p>
        </div>
      )}
      <div className="product-img">
        <img src={product.pic || "cam-5.jpg"} alt={product.name} />
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

              return (
                <div key={idx} className="color">
                  <div className="color-img">
                    <img src={colorSrc} alt={colorName} />
                  </div>
                  <p>{colorName}</p>
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
      </div>
    </div>
  );
};

export default Product;

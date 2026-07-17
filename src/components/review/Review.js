import React, { useContext, useMemo } from "react";
import "./review.css";
import { CartContext } from "../../context/CartContext";

const CATEGORY_LABELS = {
  cameras: "Cameras",
  plans: "Plan",
  sensors: "Sensors",
  "extra-protection": "Accessories",
};

const Review = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    cartByCategory,
    updateQuantity,
    removeItem,
    saveCart,
  } = useContext(CartContext);

  const [saveMessage, setSaveMessage] = React.useState("");

  const totalSavings = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        if (item.product.save) {
          return sum + (item.product.price || 0) * item.quantity * 0.2;
        }
        return sum;
      }, 0),
    [cartItems],
  );

  // Update the handlers to include color
  const handleIncrease = (productId, quantity, color = "white") => {
    updateQuantity(productId, quantity + 1, color);
  };

  const handleDecrease = (productId, quantity, color = "white") => {
    const nextQuantity = quantity - 1;
    if (nextQuantity <= 0) {
      removeItem(productId, color);
    } else {
      updateQuantity(productId, nextQuantity, color);
    }
  };

  const handleSaveCart = () => {
    const success = saveCart();
    if (success) {
      setSaveMessage("✓ System saved!");
      setTimeout(() => setSaveMessage(""), 3000);
    } else {
      setSaveMessage("Failed to save");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <span className="review-topic">REVIEW</span>
        <h2>Your security system</h2>
        <p className="review-description">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      {totalItems === 0 ? (
        <div className="review-empty">Your cart is empty.</div>
      ) : (
        <>
          <div className="review-category-list">
            {Object.entries(cartByCategory).map(([category, items]) => (
              <div className="review-category" key={category}>
                <div className="review-category-title">
                  {CATEGORY_LABELS[category] || category}
                </div>
                <div className="review-category-items">
                  {items.map(({ product, quantity }) => (
                    <div className="review-item" key={product._id}>
                      <div className="review-item-left">
                        <div className="review-item-image">
                          <img
                            src={product.pic || "cam-5.jpg"}
                            alt={product.name}
                          />
                        </div>
                        <div className="review-item-info">
                          <span className="review-item-name">
                            {product.name}
                            {product.color && product.color !== "default" && (
                              <span className="review-item-color">
                                {" "}
                                ({product.color})
                              </span>
                            )}
                          </span>
                          <span className="review-item-price">
                            $
                            {(product.price * quantity).toFixed(2) == 0
                              ? "Free"
                              : (product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="review-item-actions">
                        <button
                          className="review-btn review-btn-decrease"
                          type="button"
                          onClick={() =>
                            handleDecrease(product._id, quantity, product.color)
                          }
                        >
                          -
                        </button>
                        <span className="review-quantity">{quantity}</span>
                        <button
                          className="review-btn review-btn-increase"
                          type="button"
                          onClick={() =>
                            handleIncrease(product._id, quantity, product.color)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="review-summary-card">
            <div className="review-summary-row">
              <div className="review-summary-note">
                <span>as low as </span>
                <span className="summary-price-secondary">
                  ${(totalPrice * 0.85).toFixed(2)}/mo
                </span>
              </div>
              <div className="price-line">
                <div className="badge-img">
                  <img src="badge-2.png" alt="" />
                </div>
                <span className="summary-price">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {totalSavings > 0 && (
              <div className="review-savings">
                Congrats! You’re saving ${totalSavings.toFixed(2)} on your
                security bundle.
              </div>
            )}

            <div className="checkout-btn">
              <button>Checkout</button>
            </div>

            <div className="save-system">
              <span
                type="button"
                className="save-system-btn"
                onClick={handleSaveCart}
              >
                save my system for later
              </span>
              {saveMessage && (
                <span className="save-message">{saveMessage}</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;

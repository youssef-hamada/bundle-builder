import React from "react";
import "./product.css";

const Product = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  console.log(product);

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
            <div className="quan-dec disabled">
              <p>-</p>
            </div>

            <div className="quan-num">
              <p>1</p>
            </div>

            <div className="quan-inc active">
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

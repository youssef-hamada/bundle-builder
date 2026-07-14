import React from "react";
import "./product.css";

const Product = () => {
  return (
    <div className="product-container">
      <div className="save">
        <p>save 20%</p>
      </div>
      <div className="product-img">
        <img src="cam-1.png" alt="" />
      </div>

      <div className="product-body">
        <div className="product-header">header</div>

        <div className="product-desc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus nulla laborum porro .
        </div>

        <div className="colors">colors</div>

        <div className="quan-price">
          <div className="quantity">quantity</div>

          <div className="price">$23.12</div>
        </div>
      </div>
    </div>
  );
};

export default Product;

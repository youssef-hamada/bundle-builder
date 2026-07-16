import React, { useState, useEffect, useContext } from "react";
import "./steps.css";
import stepsData from "../../categories";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Product from "../product/Product";
import { getProducts } from "../../services/api";
import { CartContext } from "../../context/CartContext";

const Steps = () => {
  const [expandedItems, setExpandedItems] = useState([0]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialCartLoaded, setInitialCartLoaded] = useState(false);
  const { cartItems, addItem } = useContext(CartContext);

  const renderIcon = (htmlString) => {
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  const toggleItem = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProducts();
      if (response.success) {
        setAllProducts(response.data);

        const organized = {};
        stepsData.categories.forEach((category, index) => {
          organized[index] = response.data.filter(
            (product) => product.category === category.categoryName,
          );
        });
        console.log(organized);
        setCategoryProducts(organized);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (
      !loading &&
      !initialCartLoaded &&
      cartItems.length === 0 &&
      Object.keys(categoryProducts).length > 0
    ) {
      stepsData.categories.forEach((category, index) => {
        const product = categoryProducts[index]?.[0];
        if (product) {
          addItem(product, 1);
        }
      });
      setInitialCartLoaded(true);
    }
  }, [loading, initialCartLoaded, cartItems.length, categoryProducts, addItem]);

  return (
    <div className="steps-container">
      <div className="steps-wrapper">
        <Accordion className="accordion" multiple={false}>
          {stepsData.categories.map((category, index) => (
            <AccordionItem
              key={index}
              initialEntered={index === 0}
              header={() => (
                <>
                  <span className="step-label">{category.step}</span>
                  <div
                    className="step-header"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="step-header-left">
                      <div className="step-icon">
                        {category.files &&
                          category.files[0] &&
                          renderIcon(category.files[0]["path-to-icon"])}
                      </div>
                      <div className="step-header-content">
                        <h3 className="step-title">{category.name}</h3>
                      </div>
                    </div>
                    <div className="step-header-right">
                      <span className="step-selection">
                        will be done later today
                      </span>
                      <span className="step-arrow"></span>
                    </div>
                  </div>
                </>
              )}
            >
              <div className="step-content-expanded">
                {loading ? (
                  <p>loading...</p>
                ) : categoryProducts[index]?.length > 0 ? (
                  categoryProducts[index].map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Steps;

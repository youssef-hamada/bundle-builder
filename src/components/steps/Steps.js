import React, { useState, useEffect } from "react";
import "./steps.css";
import stepsData from "../../categories";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Product from "../product/Product";
import { getProducts } from "../../services/api";

const Steps = () => {
  const [expandedItems, setExpandedItems] = useState([0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

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
        setProducts(response.data);
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
    console.log(products);
  }, []);

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
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Steps;

import React, { useState } from "react";
import "./steps.css";
import stepsData from "../../categories";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

const Steps = () => {
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState([]);

  // Function to render HTML string safely
  const renderIcon = (htmlString) => {
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Toggle accordion item
  const toggleItem = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="steps-container">
      <div className="steps-wrapper">
        <Accordion className="accordion">
          {stepsData.categories.map((category, index) => (
            <>
              <span className="step-label">{category.step}</span>
              <hr />
              <AccordionItem
                key={index}
                header={() => (
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
                )}
              >
                <div className="step-content-expanded">
                  {/* Add your expanded content here */}
                  <p>Content for {category.name}</p>
                  {/* You can add options, selections, etc. here */}
                </div>
              </AccordionItem>
            </>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Steps;

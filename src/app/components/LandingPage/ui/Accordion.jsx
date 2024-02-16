"use client";
import { useState } from "react";

const AccordionItem = ({ title, description, listItems, isOpen, onToggle }) => {
  return (
    <details className="border border-mutedForeground/50">
      <summary
        className={`bg-background p-4 cursor-pointer flex justify-between items-center ${isOpen && "border-b border-mutedForeground/50"}`}
        onClick={onToggle}
      >
        <h2 className="text-xl font-bold text-tertiary">{title}</h2>
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="#306B12"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </summary>
      {isOpen && (
        <div className="bg-background p-4 rounded-xl text-mutedForeground">
          <p className="mb-4">{description}</p>
          {listItems && (
            <ul className="list-disc pl-8">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </details>
  );
};

const Accordion = ({ accordionData }) => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (index) => {
    setOpenItem((prevItem) => (prevItem === index ? null : index));
  };

  return (
    <div className="w-full my-5">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          description={item.description}
          listItems={item.listItems}
          isOpen={index === openItem}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;

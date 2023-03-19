import { useState } from "react";

const Accordian = ({ children }) => {
  return <div className="container py-5">{children}</div>;
};

export const AccordianCard = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-5 py-3 bg-paper border-b w-full text-left"
      >
        {title}
      </button>
      <div
        className={`text-sm transition-all ${
          isOpen ? "p-3 border border-t-0" : "h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordian;

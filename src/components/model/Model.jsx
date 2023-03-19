import { Icon } from "@iconify/react";

const Model = ({ children, title, isOpen, setIsOpen }) => {
  return (
    isOpen && (
      <div className="fixed top-0 rounded-lg h-full overflow-x-auto shadow-2xl left-1/2 -translate-x-1/2 bg-bg w-[60%]">
        <header className="h-[70px] bg-paper px-5 flex items-center justify-between">
          <h2 className="text-lg">{title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl rounded-full hover:bg-bg transition p-3"
          >
            <Icon icon={"uil:times"} />
          </button>
        </header>
        <div className="body">{children}</div>
      </div>
    )
  );
};

export default Model;

import Sidebar from "./global/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const darkMode = useSelector((state) => state.global.darkMode);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("darkMode");
    } else {
      document.documentElement.classList.remove("darkMode");
    }
  }, [darkMode]);
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-bg">
        <article>{children}</article>
      </main>
    </div>
  );
};

export default Layout;

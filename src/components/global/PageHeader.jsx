import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/features/globalSlice";

const PageHeader = ({ children }) => {
  const darkMode = useSelector((state) => state.global.darkMode);
  const dispatch = useDispatch();
  return (
    <section className="px-5 py-4 border-b bg-paper text-txt">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-medium">{children}</h1>
        <button onClick={() => dispatch(toggleDarkMode())}>
          <Icon
            className="text-2xl"
            icon={
              darkMode ? "ic:baseline-light-mode" : "material-symbols:dark-mode"
            }
          />
        </button>
      </header>
    </section>
  );
};

export default PageHeader;

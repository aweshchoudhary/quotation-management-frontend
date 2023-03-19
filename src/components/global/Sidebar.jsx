import Link from "next/link";
import menuData from "@/data/menu.json";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.global.isSidebarOpen);
  return (
    isSidebarOpen && (
      <aside className="basis-[300px] bg-bg text-txt border-r shrink-0 h-screen">
        <header className="px-5 bg-paper py-4 border-b text-txt">
          <h2 className=" text-xl font-bold">Q-MANAGE</h2>
        </header>
        <nav>
          <ul className="p-5">
            {menuData.map((item, index) => {
              return (
                <li className="my-1" key={index}>
                  <Link
                    className="p-3 flex items-center capitalize rounded gap-5 hover:bg-paper"
                    href={item.link}
                  >
                    <Icon icon={item.icon} className="text-2xl" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <footer></footer>
      </aside>
    )
  );
};

export default Sidebar;

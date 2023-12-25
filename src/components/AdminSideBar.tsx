import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line, RiShoppingBag3Fill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser} from "react-icons/ai";
import {  FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

interface MenuItem {
  name: string;
  link: string;
  icon: React.ElementType;
  margin?: boolean;
}

interface AdminSideBarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ open, toggleSidebar }) => {
  const menus: MenuItem[] = [
    { name: "Dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "Costumers", link: "/admin/clients", icon: AiOutlineUser },
    { name: "Products", link: "/admin/products", icon: RiShoppingBag3Fill },
    { name: "Transactions", link: "/admin/transaction", icon: FiShoppingCart },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Logout", link: "/login", icon: RiSettings4Line },
  ];

  return (
    <div className={`bg-[#82c0cc] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
      <div className="py-3 flex justify-end">
        <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-[#a0a0b0] rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;

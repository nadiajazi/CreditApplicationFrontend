import React from "react";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CogIcon
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


interface MenuItem {
  name: string;
  link: string;
  icon: React.ElementType;
  margin?: boolean;

  onClick?: () => void;  // Ajout de la propriété onClick

}

interface AdminSideBarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ open, toggleSidebar }) => {

  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.post("http://localhost:8882/api/v1/auth/logout");
      console.log("Déconnexion réussie !");
      // Vous pouvez ajouter d'autres actions de succès ici si nécessaire
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      // Vous pouvez gérer l'erreur ici, par exemple afficher un message à l'utilisateur
    }
  };

  const handleClick = () => {
    navigate("/");
    Logout();
  };


  const menus: MenuItem[] = [
    { name: "Dashboard", link: "/admin", icon: HomeIcon },
    { name: "Customers", link: "/admin/clients", icon: UsersIcon },
    { name: "Products", link: "/admin/products", icon: ShoppingBagIcon },
    { name: "Transactions", link: "/admin/transaction", icon: CreditCardIcon },
    { name: "Analytics", link: "/admin/analytics", icon: ChartBarIcon, margin: true },
    { name: "Settings", link: "/admin/settings", icon: CogIcon },
    { name: "Logout", link: "/login", icon: ArrowRightOnRectangleIcon, onClick: handleClick },
  ];

  const location = useLocation();

  return (
    <div className={`bg-gradient-to-b from-primary-900 to-primary-800 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-white shadow-hard relative`}>
      {/* Header */}
      <div className="p-4 border-b border-primary-700/50">
        <div className="flex items-center justify-between">
          {open && (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg gradient-text">CreditApp</h1>
                <p className="text-xs text-primary-300">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-primary-700/50 transition-colors duration-200"
          >
            {open ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {menus?.map((menu, i) => {
            const isActive = location.pathname === menu.link;
            const IconComponent = menu.icon;

            return (
              <div key={i} className={menu?.margin ? "mt-8" : ""}>
                {menu?.margin && open && (
                  <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-primary-300 uppercase tracking-wider">
                      Other
                    </p>
                  </div>
                )}

                <Link
                  to={menu?.link}
                  onClick={menu?.onClick}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative
                    ${isActive
                      ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-medium'
                      : 'text-primary-200 hover:bg-primary-700/50 hover:text-white'
                    }
                    ${!open && 'justify-center'}
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                  )}

                  {/* Icon */}
                  <div className={`
                    transition-transform duration-300
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  {open && (
                    <span
                      className="font-medium whitespace-nowrap animate-fade-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {menu?.name}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!open && (
                    <div className="
                      absolute left-full ml-2 px-2 py-1 bg-neutral-900 text-white text-sm rounded-md
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200 whitespace-nowrap z-50
                    ">
                      {menu?.name}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-neutral-900 rotate-45" />
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      {open && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-700/50 bg-primary-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-primary-300 truncate">admin@creditapp.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSideBar;


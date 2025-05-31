import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Drawer,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  HomeIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import axios from 'axios';

// Navbar interfaces
interface UserData {
  name: string;
  email: string;
  balance: string;
}

interface NavbarProps {
  className?: string;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<UserData>({
    name: localStorage.getItem('firstname') || 'User',
    email: localStorage.getItem('email') || 'user@example.com',
    balance: localStorage.getItem('maxAmount') || '0',
  });

  useEffect(() => {
    // Update user data when localStorage changes
    const handleStorageChange = () => {
      setUserData({
        name: localStorage.getItem('firstname') || 'User',
        email: localStorage.getItem('email') || 'user@example.com',
        balance: localStorage.getItem('maxAmount') || '0',
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8882/api/v1/auth/logout");
      localStorage.clear();
      navigate("/");
      console.log("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      // Clear localStorage anyway and redirect
      localStorage.clear();
      navigate("/");
    }
  };

  const navItems: NavItem[] = [
    { label: "Dashboard", icon: HomeIcon, href: "/client/dashboard" },
    { label: "Payments", icon: CreditCardIcon, href: "/client/dashboard/payment" },
    { label: "Invoices", icon: DocumentTextIcon, href: "/client/dashboard/invoices" },
    { label: "History", icon: ClockIcon, href: "/client/dashboard/history" },
  ];

  const userMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      onClick: () => navigate("/client/profile"),
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
      onClick: () => navigate("/client/settings"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200 shadow-soft transition-all duration-300 ${className}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleDrawerToggle}
              className="p-2 rounded-xl hover:bg-primary-50 transition-all duration-300 hover:scale-110 lg:hidden"
            >
              {openDrawer ? (
                <XMarkIcon className="h-6 w-6 text-primary-600" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6 text-primary-600" strokeWidth={2} />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl gradient-text">CreditApp</h1>
                <p className="text-xs text-neutral-500 hidden sm:block">Smart Credit Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-64 rounded-xl border border-neutral-300 bg-white px-4 pl-10 pr-4 text-sm text-neutral-700 placeholder-neutral-400 transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none shadow-sm hover:shadow-md"
                placeholder="Search transactions..."
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </form>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-primary-50 transition-all duration-300 hover:scale-110">
              <BellIcon className="h-5 w-5 text-neutral-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Menu */}
            <Menu open={isMenuOpen} handler={setIsMenuOpen}>
              <MenuHandler>
                <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary-50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {userData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-neutral-900">
                        {userData.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Balance: ${userData.balance}
                      </p>
                    </div>
                    <ChevronDownIcon
                      className={`h-4 w-4 text-neutral-600 transition-transform duration-300 ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
              </MenuHandler>
              <MenuList className="p-2 bg-white border border-neutral-200 shadow-medium rounded-xl animate-fade-in">
                {userMenuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={item.onClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      item.label === "Sign Out"
                        ? "text-red-600 hover:bg-red-50"
                        : "text-neutral-700 hover:bg-primary-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={2} />
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} className="p-0">
        <div className="bg-gradient-to-b from-primary-600 to-primary-700 p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">CreditApp</h2>
                <p className="text-xs text-primary-200">Smart Credit Management</p>
              </div>
            </div>
            <button
              onClick={() => setOpenDrawer(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* User Info in Mobile */}
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium">{userData.name}</p>
              <p className="text-xs text-primary-200">Balance: ${userData.balance}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Mobile Search */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-xl border border-neutral-300 bg-white px-4 pl-10 pr-4 text-sm text-neutral-700 placeholder-neutral-400 transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                placeholder="Search transactions..."
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </form>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.href);
                  setOpenDrawer(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Actions */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="space-y-2">
              {userMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setOpenDrawer(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    item.label === "Sign Out"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-neutral-700 hover:bg-primary-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
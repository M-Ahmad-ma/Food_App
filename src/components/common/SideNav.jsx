import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Logo.svg";
import discount from "../../assets/Icon/Discount.svg";
import setting from "../../assets/Icon/Setting.svg";
import logout from "../../assets/Icon/Logout.svg";
import Notification from "../../assets/Icon/Notification.svg";
import Graph from "../../assets/Icon/Dashboard.svg";
import home from "../../assets/Icon/Home.svg";

const SideNav = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveItem(path || "home");

    // Add window resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]);

  const toggleSideNav = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Hamburger Menu Button - Always visible on mobile */}
      <button
        className="lg:hidden fixed left-4 top-1 z-50 text-primary hover:text-primary transition-colors duration-200"
        onClick={toggleSideNav}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSideNav}
        />
      )}

      {/* Sidenav */}
      <div
        className={`
                 h-screen z-50  
                lg:translate-x-0
                transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className={`rounded-r-xl  h-full bg-dark-bg-2 pt-5 flex flex-col gap-20 ${open ? 'w-[7rem]' : 'w-0'}`}>
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <nav>
            <ul className="flex flex-col gap-11 ml-3">
              <Link to="/">
                <li
                  className={`w-full py-4 rounded-s-lg cursor-pointer hover:bg-hover ${
                    activeItem === "home" ? "active bg-dark-bg" : ""
                  }`}
                >
                  <img
                    src={home}
                    alt="home"
                    className={`ml-4 transition-all duration-200 ${
                      activeItem === "home"
                        ? "lg:bg-primary p-4 rounded-lg text-white"
                        : "hover:scale-110"
                    }`}
                  />
                </li>
              </Link>
              <Link to="/dashboard">
                <li
                  className={`w-full py-4 rounded-s-lg cursor-pointer hover:bg-hover ${
                    activeItem === "dashboard" ? "active bg-dark-bg" : ""
                  }`}
                >
                  <img
                    src={Graph}
                    alt="dashboard"
                    className={`ml-4 transition-all duration-200 ${
                      activeItem === "dashboard"
                        ? "lg:bg-primary p-4 rounded-lg"
                        : "hover:scale-110"
                    }`}
                  />
                </li>
              </Link>
              <li
                className={`w-full py-4 rounded-s-lg cursor-pointer hover:bg-hover ${
                  activeItem === "discount" ? "active bg-dark-bg" : ""
                }`}
              >
                <img
                  src={discount}
                  alt="discount"
                  className={`ml-4 transition-all duration-200 ${
                    activeItem === "discount"
                      ? "lg:bg-primary p-4 rounded-lg text-white"
                      : "hover:scale-110"
                  }`}
                />
              </li>
              <Link to="/settings">
                <li
                  className={`w-full py-4 rounded-s-lg cursor-pointer hover:bg-hover ${
                    activeItem === "settings" ? "active bg-dark-bg" : ""
                  }`}
                >
                  <img
                    src={setting}
                    alt="setting"
                    className={`ml-4 transition-all duration-200 ${
                      activeItem === "settings"
                        ? "lg:bg-primary p-4 rounded-lg text-white"
                        : "hover:scale-110"
                    }`}
                  />
                </li>
              </Link>
              <li
                className={`w-full py-4 rounded-s-lg cursor-pointer hover:bg-hover ${
                  activeItem === "logout" ? "active bg-dark-bg" : ""
                }`}
              >
                <img
                  src={logout}
                  alt="logout"
                  className={`ml-4 transition-all duration-200 ${
                    activeItem === "logout"
                      ? "lg:bg-primary p-4 rounded-lg text-white"
                      : "hover:scale-110"
                  }`}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNav;

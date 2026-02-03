import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user")) || {};
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-full flex-col justify-between glass-effect border-r border-slate-700/50 hidden lg:flex">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "bg-gradient-to-r from-accent-primary/20 to-accent-light/20 text-accent-primary border border-accent-primary/30"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
            }`}
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
              className="h-5 w-5"
            />
            <span>Dashboard</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive("/inventory")
                  ? "bg-gradient-to-r from-accent-primary/20 to-accent-light/20 text-accent-primary border border-accent-primary/30"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <Link to="/inventory" className="flex items-center gap-3 w-full">
                <img
                  alt="inventory-icon"
                  src={require("../assets/inventory-icon.png")}
                  className="h-5 w-5"
                />
                <span>Inventory</span>
              </Link>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive("/purchase-details")
                ? "bg-gradient-to-r from-accent-primary/20 to-accent-light/20 text-accent-primary border border-accent-primary/30"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
            }`}
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
              className="h-5 w-5"
            />
            <span>Purchase Details</span>
          </Link>

          <Link
            to="/sales"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive("/sales")
                ? "bg-gradient-to-r from-accent-primary/20 to-accent-light/20 text-accent-primary border border-accent-primary/30"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
            }`}
          >
            <img
              alt="sale-icon"
              src={require("../assets/supplier-icon.png")}
              className="h-5 w-5"
            />
            <span>Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive("/manage-store")
                  ? "bg-gradient-to-r from-accent-primary/20 to-accent-light/20 text-accent-primary border border-accent-primary/30"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <Link to="/manage-store" className="flex items-center gap-3 w-full">
                <img
                  alt="store-icon"
                  src={require("../assets/order-icon.png")}
                  className="h-5 w-5"
                />
                <span>Manage Store</span>
              </Link>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-slate-700/50">
        <div className="flex items-center gap-3 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-colors duration-200">
          <img
            alt="Profile"
            src={localStorageData?.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"}
            className="h-10 w-10 rounded-full object-cover border-2 border-accent-primary/30"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces";
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs">
              <strong className="block font-medium text-slate-100 truncate">
                {localStorageData?.firstName || ""} {localStorageData?.lastName || ""}
              </strong>
              <span className="text-slate-400 text-xs truncate block">
                {localStorageData?.email || ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;

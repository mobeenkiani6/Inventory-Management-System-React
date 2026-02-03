import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

function Layout() {
  return (
    <>
      <div className="md:h-16">
        <Header />
      </div>
      <div className="grid grid-cols-12 bg-slate-900 items-baseline min-h-screen">
        <div className="col-span-2 h-screen sticky top-0 hidden lg:flex">
          <SideMenu />
        </div>
        <div className="col-span-12 lg:col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;

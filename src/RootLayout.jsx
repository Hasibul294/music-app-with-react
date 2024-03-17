// import React from 'react'

import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Aside from "./components/ui/Aside";
import { useState } from "react";

const RootLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="">
      <Navbar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      ></Navbar>
      <Aside
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      ></Aside>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;

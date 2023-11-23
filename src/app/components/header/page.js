"use client";
import React from "react";
import CustomSidebar from "@/app/components/sidebar/page";
import DrawerComponent from "@/app/components/drawer/page";

const Header = ({ userRole, toggle, isOpen, toggleDrawer, pathname }) => {
  return (
    <div>
      <div className="hidden md:block">
        <CustomSidebar
          userRole={userRole}
          toggle={toggle}
          pathname={pathname}
        />
      </div>
      <div className="md:hidden block bg-red-200">
        <DrawerComponent
          userRole={userRole}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          pathname={pathname}
        />
      </div>
    </div>
  );
};

export default Header;

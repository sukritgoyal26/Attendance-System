"use client";
import React from "react";
import ModernDrawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import CustomSidebar from "../sidebar/page";

const DrawerComponent = ({
  userRole,
  toggle,
  isOpen,
  toggleDrawer,
  pathname,
}) => {
  return (
    <>
      <ModernDrawer
        open={!isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="drawer "
      >
        <CustomSidebar
          userRole={userRole}
          toggle={toggle}
          pathname={pathname}
        />
      </ModernDrawer>
    </>
  );
};

export default DrawerComponent;

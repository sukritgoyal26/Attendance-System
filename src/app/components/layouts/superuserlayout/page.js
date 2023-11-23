// SuperuserLayout.js
"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/header/page";
import Navbar from "../../navbar/page";
import { usePathname } from "next/navigation";

const SuperuserLayout = ({ children }) => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 850 && window.innerWidth > 766) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };

    // Add event listener to window resize event.
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount.
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // for drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} handleToggle={handleToggle} />
      <div style={{ display: "flex" }}>
        <div style={{ 
     
      backgroundImage: 'linear-gradient( 288deg,  rgba(0,85,255,1) 1.5%, rgba(4,56,115,1) 91.6% )',
      backgroundSize: 'cover' }}>
          <Header
            userRole="superuser"
            toggle={toggle}
            isOpen={isOpen}
            toggleDrawer={toggleDrawer}
            pathname={pathname}
          />
        </div>
        {/* Additional components and functionalities specific to superuser */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default SuperuserLayout;

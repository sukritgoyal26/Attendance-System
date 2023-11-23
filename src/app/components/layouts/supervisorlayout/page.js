// SuperuserLayout.js
"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/header/page";
import Navbar from "../../navbar/page";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SupervisorLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    // Retrieve teamLead status from localStorage
    const isTeamLead = localStorage.getItem("teamLead") === "true";
    const token = localStorage.getItem("token");

    if (!isTeamLead || !token) {
      router.push("/");
    }
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
      <div style={{ display: "flex" }} >
        <Header
          userRole="supervisor"
          toggle={toggle}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          pathname={pathname}
        />
        {/* Additional components and functionalities specific to supervisor */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default SupervisorLayout;

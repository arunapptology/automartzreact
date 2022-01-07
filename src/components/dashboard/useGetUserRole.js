import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  navUserDashboard,
  navVendorDashboard,
} from "../navbar/navigationSlugs";

export const useGetUserRole = () => {
  const { pathname } = useLocation();
  const [userRole, getUserRole] = useState("");

  const setUserRole = () => {
    if (pathname.includes(navUserDashboard)) {
      getUserRole(2);
    } else if (pathname.includes(navVendorDashboard)) {
      getUserRole(3);
    } else {
      getUserRole();
    }
  };

  return [userRole, setUserRole];
};

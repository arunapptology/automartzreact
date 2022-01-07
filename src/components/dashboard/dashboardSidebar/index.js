import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserRole } from "../useGetUserRole";
import DashboardNavigation from "./DashboardNavigation";
import ProfileItem from "./ProfileItem";

import "./dashboardSidebar.css";

const DashboardSidebar = () => {
  const [userRole, setUserRole] = useGetUserRole();
  const { loggedinUserInfo, isUserLoggedin } = useSelector(
    (state) => state.userReducer
  );
  const { loggedinVendorInfo, isVendorLoggedin } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      <div className="dashboard__sidebar">
        {userRole === 2 && <ProfileItem info={loggedinUserInfo} />}
        {userRole === 3 && <ProfileItem info={loggedinVendorInfo} />}

        <DashboardNavigation />
      </div>
    </>
  );
};

export default DashboardSidebar;

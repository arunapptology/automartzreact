import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { navUserLogin, navVendorLogin } from "../../navbar/navigationSlugs";
import DashboardHeading from "../../ui/DashboardHeading";

import { useGetUserRole } from "../useGetUserRole";
import ProfileDetails from "./ProfileDetails";

const ViewProfile = () => {
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
      <div className="card p-4">
        <DashboardHeading title="My Profile" />

        {userRole === 2 && (
          <>
            {isUserLoggedin ? (
              <ProfileDetails info={loggedinUserInfo} />
            ) : (
              <Redirect to={navUserLogin} />
            )}
          </>
        )}

        {userRole === 3 && (
          <>
            {isVendorLoggedin ? (
              <ProfileDetails info={loggedinVendorInfo} />
            ) : (
              <Redirect to={navVendorLogin} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ViewProfile;

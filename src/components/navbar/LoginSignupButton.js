import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getUserLogout } from "../../slices/userSlice";
import { getVendorLogout } from "../../slices/vendorSlice";
import { useGetUserRole } from "../dashboard/useGetUserRole";
import {
  navUserDashboard,
  navUserLogin,
  navUserSignup,
  navVendorDashboard,
  navVendorLogin,
  navVendorSignup,
} from "./navigationSlugs";

const LoginSignupButton = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [userRole, setUserRole] = useGetUserRole();

  const { loggedinUserInfo } = useSelector((state) => state.userReducer);
  const { loggedinVendorInfo } = useSelector((state) => state.vendorReducer);

  useEffect(() => {
    setUserRole();
  }, [userRole, pathname]);

  const logout = () => {
    if (userRole === 2) {
      dispatch(getUserLogout());
      history.replace(navUserLogin);
    }
    if (userRole === 3) {
      dispatch(getVendorLogout());
      history.replace(navVendorLogin);
    }
  };

  return (
    <>
      <div className="login-bar">
        <div className="login-box">
          {!userRole && (
            <>
              {loggedinUserInfo?.Id || loggedinVendorInfo?.Id ? (
                <>
                  {loggedinUserInfo?.Id && !loggedinVendorInfo?.Id && (
                    <Link to={navUserDashboard}>Go To Dashboard</Link>
                  )}

                  {!loggedinUserInfo?.Id && loggedinVendorInfo?.Id && (
                    <Link to={navVendorDashboard}>Go To Dashboard</Link>
                  )}
                  {loggedinUserInfo?.Id && loggedinVendorInfo?.Id && (
                    <div className="redirect__dashboard">
                      <span>Go To Dashboard</span>

                      <div className="login__links">
                        <Link to={navUserDashboard}>User Dashboard</Link>
                        <Link to={navVendorDashboard}>Vendor Dashboard</Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="login">
                    <span>Login</span>

                    <div className="login__links">
                      <Link to={navUserLogin}>User Login</Link>
                      <Link to={navVendorLogin}>Vendor Login</Link>
                    </div>
                  </div>
                  <div className="signup">
                    <span>Signup</span>

                    <div className="login__links">
                      <Link to={navUserSignup}>User Signup</Link>
                      <Link to={navVendorSignup}>Vendor Signup</Link>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {userRole && <span onClick={logout}>Logout</span>}
        </div>
      </div>
    </>
  );
};

export default LoginSignupButton;

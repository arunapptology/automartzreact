import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashboardNavs } from "./dashboardNavigationsList";

import {
  navUserDashboard,
  navUserLogin,
  navVendorDashboard,
  navVendorLogin,
} from "../../navbar/navigationSlugs";

import { useGetUserRole } from "../useGetUserRole";

import { getUserLogout } from "../../../slices/userSlice";
import { getVendorLogout } from "../../../slices/vendorSlice";

const DashboardNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userRole, setUserRole] = useGetUserRole();

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  let loggedin_type_path = "";

  if (userRole === 2) {
    loggedin_type_path = navUserDashboard;
  }
  if (userRole === 3) {
    loggedin_type_path = navVendorDashboard;
  }

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
      <div className="dashboard__navigation">
        <ul className="nav flex-column profile__navs accordion" id="accordion">
          <li className="nav-item">
            <NavLink to={loggedin_type_path} activeClassName="active" exact>
              Home
            </NavLink>
          </li>
          {dashboardNavs?.map(({ name, slug }, i) => (
            <li className="nav-item" key={i}>
              <NavLink
                to={`${loggedin_type_path}/${slug}`}
                activeClassName="active"
              >
                {name}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <span onClick={logout}>Logout</span>
          </li>
        </ul>

        {/* <div className="pt-3">
          <h6 className="mb-2 font-weight-500">Stock Details</h6>
          <ul className="nav flex-column profile__navs">
            {stockDetailsNavs?.map(({ name, slug }, i) => (
              <li className="nav-item" key={i}>
                <NavLink
                  to={`${loggedin_type_path}/${slug}`}
                  activeClassName="active"
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default DashboardNavigation;

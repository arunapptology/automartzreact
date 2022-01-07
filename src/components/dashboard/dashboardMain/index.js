import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import About from "../profiles/About";
import StockDetails from "../stockDetails/StockDetails";
import { useGetUserRole } from "../useGetUserRole";
import TopStats from "./TopStats";

const DashboardMain = () => {
  const [userRole, setUserRole] = useGetUserRole();
  const { loggedinUserInfo } = useSelector((state) => state.userReducer);
  const { loggedinVendorInfo } = useSelector((state) => state.vendorReducer);

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      <div className="top__stats">
        {userRole === 2 && <TopStats info={loggedinUserInfo} />}
        {userRole === 3 && <TopStats info={loggedinVendorInfo} />}
      </div>
      {userRole === 2 && <About info={loggedinUserInfo} />}
      {userRole === 3 && <About info={loggedinVendorInfo} />}

      <StockDetails />
    </>
  );
};

export default DashboardMain;

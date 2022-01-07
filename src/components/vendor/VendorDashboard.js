import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import { useGetUserRole } from "../dashboard/useGetUserRole";
import { navVendorLogin } from "../navbar/navigationSlugs";

const VendorDashboard = () => {
  const [userRole, setUserRole] = useGetUserRole();

  const { isVendorLoggedin } = useSelector((state) => state.vendorReducer);

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      {userRole === 3 && (
        <>
          {isVendorLoggedin ? <Dashboard /> : <Redirect to={navVendorLogin} />}
        </>
      )}
    </>
  );
};

export default VendorDashboard;

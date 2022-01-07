import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import { useGetUserRole } from "../dashboard/useGetUserRole";
import { navUserLogin } from "../navbar/navigationSlugs";

const UserDashboard = () => {
  const [userRole, setUserRole] = useGetUserRole();

  const { isUserLoggedin } = useSelector((state) => state.userReducer);

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      {userRole === 2 && (
        <>{isUserLoggedin ? <Dashboard /> : <Redirect to={navUserLogin} />}</>
      )}
    </>
  );
};

export default UserDashboard;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserRole } from "../useGetUserRole";
import StockTable from "./StockTable";

const Services = () => {
  const [userRole, setUserRole] = useGetUserRole();

  const { services: userServices } = useSelector((state) => state.userReducer);
  const { services: vendorServices } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      {userRole === 2 && <StockTable stock={userServices} />}
      {userRole === 3 && <StockTable stock={vendorServices} />}
    </>
  );
};

export default Services;

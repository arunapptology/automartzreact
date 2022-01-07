import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserRole } from "../useGetUserRole";
import StockTable from "./StockTable";

const BuySell = () => {
  const [userRole, setUserRole] = useGetUserRole();

  const { buySell: userBuySell } = useSelector((state) => state.userReducer);
  const { buySell: vendorBuySell } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);
  return (
    <>
      {userRole === 2 && <StockTable stock={userBuySell} />}
      {userRole === 3 && <StockTable stock={vendorBuySell} />}
    </>
  );
};

export default BuySell;

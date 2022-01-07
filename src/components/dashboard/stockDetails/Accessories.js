import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserRole } from "../useGetUserRole";
import StockTable from "./StockTable";

const Accessories = () => {
  const [userRole, setUserRole] = useGetUserRole();

  const { accessories: userAccessories } = useSelector(
    (state) => state.userReducer
  );
  const { accessories: vendorAccessories } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);
  return (
    <>
      {userRole === 2 && <StockTable stock={userAccessories} />}
      {userRole === 3 && <StockTable stock={vendorAccessories} />}
    </>
  );
};

export default Accessories;

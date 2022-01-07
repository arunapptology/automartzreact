import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserRole } from "../useGetUserRole";
import StockTable from "./StockTable";

const SpareParts = () => {
  const [userRole, setUserRole] = useGetUserRole();
  const { spareParts: userSpareParts } = useSelector(
    (state) => state.userReducer
  );
  const { spareParts: vendorSpareParts } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);
  return (
    <>
      {userRole === 2 && <StockTable stock={userSpareParts} />}
      {userRole === 3 && <StockTable stock={vendorSpareParts} />}
    </>
  );
};

export default SpareParts;

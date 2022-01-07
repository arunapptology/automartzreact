import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { navUserLogin, navVendorLogin } from "../../navbar/navigationSlugs";
import { useGetUserRole } from "../useGetUserRole";
import StockDetailsTabs from "./StockDetailsTabs";
import { useGetVendorStocksMutation } from "../../../services/vendorApi";
import { useGetUserStocksMutation } from "../../../services/userApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserStocks } from "../../../slices/userSlice";
import { getVendorStocks } from "../../../slices/vendorSlice";
import DashboardHeading from "../../ui/DashboardHeading";
import UploadStockButton from "../uploadStocks/UploadStockButton";
import { useSelector } from "react-redux";

const StockDetails = () => {
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useGetUserRole();

  const [fetchUserStock, { data: userStocks }] = useGetUserStocksMutation();
  const [fetchVendorStock, { data: vendorStocks }] =
    useGetVendorStocksMutation();

  const { loggedinUserInfo, isUserLoggedin } = useSelector(
    (state) => state.userReducer
  );
  const { loggedinVendorInfo, isVendorLoggedin } = useSelector(
    (state) => state.vendorReducer
  );

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  useEffect(() => {
    let formData = new FormData();
    if (userRole === 2) {
      formData?.append("userId", loggedinUserInfo?.Id);
      fetchUserStock(formData);
    }

    if (userRole === 3) {
      formData?.append("vendorId", loggedinVendorInfo?.Id);
      fetchVendorStock(formData);
    }
  }, [userRole]);

  useEffect(() => {
    if (
      userStocks?.status === 1 &&
      userStocks?.search_data?.userStock?.length > 0
    ) {
      dispatch(getUserStocks(userStocks?.search_data?.userStock));
    }
  }, [userStocks]);

  useEffect(() => {
    if (
      vendorStocks?.status === 1 &&
      vendorStocks?.search_data?.vendorStock?.length > 0
    ) {
      dispatch(getVendorStocks(vendorStocks?.search_data?.vendorStock));
    }
  }, [vendorStocks]);

  return (
    <>
      <div className="card p-4">
        <DashboardHeading title="My Stock Details">
          <UploadStockButton />
        </DashboardHeading>
        {userRole === 2 && (
          <>
            {isUserLoggedin ? (
              <StockDetailsTabs />
            ) : (
              <Redirect to={navUserLogin} />
            )}
          </>
        )}

        {userRole === 3 && (
          <>
            {isVendorLoggedin ? (
              <StockDetailsTabs />
            ) : (
              <Redirect to={navVendorLogin} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StockDetails;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  navUploadAccessoriesStocks,
  navUploadBuySellStocks,
  navUploadServicesStocks,
  navUploadSParePartsStocks,
  navUserDashboard,
  navVendorDashboard,
} from "../../navbar/navigationSlugs";
import { useGetUserRole } from "../useGetUserRole";

const UploadStockButton = () => {
  const [userRole, setUserRole] = useGetUserRole();
  useEffect(() => {
    setUserRole();
  }, [userRole]);

  let dashboardNav;
  if (userRole === 2) {
    dashboardNav = navUserDashboard;
  } else if (userRole === 3) {
    dashboardNav = navVendorDashboard;
  }

  return (
    <>
      <div className="upload_btn">
        <span className="dropdown">
          <a
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            upload stock
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <div className="dropdown-item">
              {" "}
              <Link to={`${dashboardNav}${navUploadBuySellStocks}`}>
                Buy/sell
              </Link>{" "}
            </div>

            <div className="dropdown-item">
              {" "}
              <Link to={`${dashboardNav}${navUploadSParePartsStocks}`}>
                Spare parts
              </Link>{" "}
            </div>

            <div className="dropdown-item">
              {" "}
              <Link to={`${dashboardNav}${navUploadAccessoriesStocks}`}>
                Accessories
              </Link>{" "}
            </div>

            <div className="dropdown-item">
              {" "}
              <Link to={`${dashboardNav}${navUploadServicesStocks}`}>
                Services
              </Link>{" "}
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default UploadStockButton;

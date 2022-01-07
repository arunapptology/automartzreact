import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";

import ViewProfile from "./profiles/ViewProfile";
import {
  navStockDetails,
  navUploadBuySellStocks,
  navUploadSParePartsStocks,
  navUserDashboard,
  navVendorDashboard,
  navViewProfile,
} from "../navbar/navigationSlugs";
import StockDetails from "./stockDetails/StockDetails";
import UploadStockBuySell from "./uploadStocks/UploadStockBuySell";
import UploadStockSpareParts from "./uploadStocks/UploadStockSpareParts";
import DashboardSidebar from "./dashboardSidebar";
import DashboardMain from "./dashboardMain";

import "./dashboard.css";
import TopStats from "./dashboardMain/TopStats";
import { useGetUserRole } from "./useGetUserRole";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [userRole, setUserRole] = useGetUserRole();
  const { loggedinUserInfo } = useSelector((state) => state.userReducer);
  const { loggedinVendorInfo } = useSelector((state) => state.vendorReducer);

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  return (
    <>
      <div className="emp-profile dashboard">
        <div className="">
          <div className="row no-gutters">
            <div className="col-md-3">
              <DashboardSidebar />
            </div>
            <div
              className="col-md-9"
              style={{ background: "var(--bs-gray-100)" }}
            >
              <div className="p-4">
                <Route path={navUserDashboard} exact>
                  <DashboardMain />
                </Route>
                <Route path={navVendorDashboard} exact>
                  <DashboardMain />
                </Route>
                <Route path={`${navUserDashboard}${navViewProfile}`} exact>
                  <ViewProfile />
                </Route>
                <Route path={`${navVendorDashboard}${navViewProfile}`} exact>
                  <ViewProfile />
                </Route>
                <Route path={`${navUserDashboard}${navStockDetails}`} exact>
                  <StockDetails />
                </Route>
                <Route path={`${navVendorDashboard}${navStockDetails}`} exact>
                  <StockDetails />
                </Route>
                <Route
                  path={`${navUserDashboard}${navUploadBuySellStocks}`}
                  exact
                >
                  <UploadStockBuySell />
                </Route>
                <Route
                  path={`${navVendorDashboard}${navUploadBuySellStocks}`}
                  exact
                >
                  <UploadStockBuySell />
                </Route>
                <Route
                  path={`${navUserDashboard}${navUploadSParePartsStocks}`}
                  exact
                >
                  <UploadStockSpareParts />
                </Route>
                <Route
                  path={`${navVendorDashboard}${navUploadSParePartsStocks}`}
                  exact
                >
                  <UploadStockSpareParts />
                </Route>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

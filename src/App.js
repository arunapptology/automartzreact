import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./Footer";
import Body from "./Body";

import { useDispatch } from "react-redux";
import { getUserLocation } from "./slices/locationSlice";

import "./App.css";
import ScrollToTop from "./components/utils/ScrollToTop";

import SearchProducts from "./components/searchComponents/SearchProducts";
import {
  navComingSoon,
  navCommunity,
  navForgotPassword,
  navLaunchesList,
  navNewsList,
  navProductDetails,
  navSearchProducts,
  navStockPromotion,
  navTrendingDetails,
  navUserDashboard,
  navUserLogin,
  navUserSignup,
  navUserVerify,
  navVendorDashboard,
  navVendorDetails,
  navVendorLogin,
  navVendors,
  navVendorSignup,
  navVendorVerify,
} from "./components/navbar/navigationSlugs";
import ProductDetails from "./components/products/productDetails/ProductDetails";
import ComingSoon from "./components/utils/ComingSoon";
import VendorDashboard from "./components/vendor/VendorDashboard";
import UserDashboard from "./components/user/UserDashboard";
import VendorDetails from "./components/vendor/vendorDetails/VendorDetails";
import Vendors from "./components/vendor/vendors/Vendors";
import LaunchesList from "./components/blogComponents/news/LaunchesList";
import NewsList from "./components/blogComponents/news/NewsList";
import TrandingDetails from "./components/blogComponents/TrandingDetails";
import Verify from "./components/ui/Verify";
import ForgotPassword from "./components/ui/ForgotPassword";
import VendorLogin from "./components/vendor/VendorLogin";
import VendorSignup from "./components/vendor/VendorSignup";
import UserLogin from "./components/user/UserLogin";
import UserSignup from "./components/user/UserSignup";
import Community from "./components/community/Community";
import { useEffect } from "react";
import { getLoggedinUserInfo } from "./slices/userSlice";
import { useSelector } from "react-redux";
import { getLoggedinVendorInfo } from "./slices/vendorSlice";
import StockPromotion from "./components/stockPromotion/StockPromotion";
import { getActiveUserRole, getUserInquiryInfo } from "./slices/globalSlice";

require("dotenv").config();

function App() {
  const dispatch = useDispatch();

  const { isUserLoggedin, loggedinUserInfo } = useSelector(
    (state) => state.userReducer
  );
  const { isVendorLoggedin, loggedinVendorInfo } = useSelector(
    (state) => state.vendorReducer
  );
  const { userInquiryInfo } = useSelector((state) => state.globalReducer);

  // get login status from localstorage
  const userInfo_storage = JSON.parse(localStorage?.getItem("user_info"));
  const vendorInfo_storage = JSON.parse(localStorage?.getItem("vendor_info"));
  // get user inquiry info
  const userInquiryInfo_storage = JSON.parse(
    localStorage?.getItem("user_inquiry_info")
  );

  // update redux state state of login status on load
  useEffect(() => {
    dispatch(getLoggedinUserInfo(userInfo_storage));
  }, []);

  useEffect(() => {
    dispatch(getLoggedinVendorInfo(vendorInfo_storage));
  }, []);

  // update the redux state from local storage on load
  useEffect(() => {
    dispatch(getUserInquiryInfo(userInquiryInfo_storage));
  }, []);

  // change the login status nad info in local storage  whenever user login state changes
  useEffect(() => {
    if (!isUserLoggedin) {
      localStorage?.removeItem("user_info");
      return;
    } else if (isUserLoggedin) {
      localStorage.setItem("user_info", JSON.stringify(loggedinUserInfo));
      return;
    }
  }, [isUserLoggedin]);

  // change the login status and info in local storage  whenever vendor login state changes
  useEffect(() => {
    if (!isVendorLoggedin) {
      localStorage?.removeItem("vendor_info");
      return;
    } else if (isVendorLoggedin) {
      localStorage.setItem("vendor_info", JSON.stringify(loggedinVendorInfo));
      return;
    }
  }, [isVendorLoggedin]);

  // change the user inquiry info in local storage  whenever info state changes
  useEffect(() => {
    if (userInquiryInfo?.mobile || userInquiryInfo?.pin_code) {
      localStorage.setItem(
        "user_inquiry_info",
        JSON.stringify(userInquiryInfo)
      );
    }
  }, [userInquiryInfo]);

  // const getLocation = useCallback(() => {
  //   if (!navigator.geolocation) {
  //     alert("Geolocation is not supported by your browser");
  //   } else {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         dispatch(
  //           getUserLocation({
  //             lat: position.coords.latitude,
  //             long: position.coords.longitude,
  //           })
  //         );
  //       },
  //       () => {
  //         alert("Unable to retrieve your location");
  //       }
  //     );
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Switch>
          <Route path="/" exact>
            <Body />
          </Route>

          <Route path={navSearchProducts}>
            <SearchProducts />
          </Route>

          <Route path={`${navProductDetails}/:id/:categoryTbl`}>
            <ProductDetails />
          </Route>

          <Route path={navUserSignup} exact>
            <UserSignup />
          </Route>

          <Route path={navUserLogin} exact>
            <UserLogin />
          </Route>

          <Route path={navVendorSignup} exact>
            <VendorSignup />
          </Route>

          <Route path={navVendorLogin} exact>
            <VendorLogin />
          </Route>

          <Route path={navForgotPassword} exact>
            <ForgotPassword />
          </Route>

          <Route path={`${navUserVerify}/:userId`} exact>
            <Verify />
          </Route>

          <Route path={`${navVendorVerify}/:vendorId`} exact>
            <Verify />
          </Route>

          <Route path={navStockPromotion} exact>
            <StockPromotion />
          </Route>

          <Route path={`${navTrendingDetails}/:id/:name`}>
            <TrandingDetails />
          </Route>

          <Route path={navNewsList} exact>
            <NewsList />
          </Route>

          <Route path={navLaunchesList} exact>
            <LaunchesList />
          </Route>

          <Route path={navVendors} exact>
            <Vendors />
          </Route>

          <Route path={`${navVendorDetails}/:type/:id`}>
            <VendorDetails />
          </Route>

          <Route path={navCommunity}>
            <Community />
          </Route>

          {/* Dashboard */}

          <Route path={navUserDashboard}>
            <UserDashboard />
          </Route>

          <Route path={navVendorDashboard}>
            <VendorDashboard />
          </Route>

          <Route path={navComingSoon}>
            <ComingSoon />
          </Route>

          <Redirect to="/" path="*" />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;

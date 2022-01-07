import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link, useLocation, useHistory } from "react-router-dom";

import { loginValidaion } from "../formValidation/loginValidation";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  navCommunity,
  navUserDashboard,
  navVendorDashboard,
} from "../navbar/navigationSlugs";
import { useDispatch } from "react-redux";
import { getLoggedinUserInfo } from "../../slices/userSlice";
import { getLoggedinVendorInfo } from "../../slices/vendorSlice";
import { useGetUserLoginMutation } from "../../services/userApi";
import { useGetVendorLoginMutation } from "../../services/vendorApi";
import Loader from "../loader";
import { deActivateLoginPopup } from "../../slices/communitySlice";

const LoginForm = ({ UserRole }) => {
  let history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [callUserLoginAPI, { data: userLoggedinData, isLoading: userLoading }] =
    useGetUserLoginMutation();
  const [
    callVendorLoginAPI,
    { data: vendorLoggedinData, isLoading: vendorLoading },
  ] = useGetVendorLoginMutation();

  const { countriesList } = useSelector((state) => state.locationReducer);
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);

  const [loginWithMobile, setLoginWithMobile] = useState(false);

  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    country_code: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { formErrors } = loginValidaion(loginData);

    if (formErrors?.[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: formErrors?.[e.target.name],
      });
    }

    if (!formErrors?.[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: formErrors?.[e.target.name],
      });
    }

    if (!errors[e.target.name]) {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, mobile, password } = loginData;
    let formHasNoError;

    if (loginWithMobile) {
      const { formErrors, formIsValid } = loginValidaion({
        mobile,
        password,
      });
      setErrors(formErrors);
      formHasNoError = formIsValid;
    } else if (!loginWithMobile) {
      const { formErrors, formIsValid } = loginValidaion({
        email,
        password,
      });
      setErrors(formErrors);
      formHasNoError = formIsValid;
    }

    if (formHasNoError) {
      let newFormData = new FormData();

      if (loginWithMobile) {
        newFormData.append("username", loginData.mobile);
      } else {
        newFormData.append("username", loginData.email);
      }

      newFormData.append("password", loginData.password);
      newFormData.append("UserRole", UserRole);

      if (UserRole === 2) {
        callUserLoginAPI(newFormData);
      }

      if (UserRole === 3) {
        callVendorLoginAPI(newFormData);
      }
    }
  };

  useEffect(() => {
    if (userLoggedinData?.status === 1) {
      dispatch(getLoggedinUserInfo(userLoggedinData?.user_info));

      if (location?.pathname?.includes(navCommunity)) {
        dispatch(deActivateLoginPopup());
      }
    }

    if (vendorLoggedinData?.status === 1) {
      dispatch(getLoggedinVendorInfo(vendorLoggedinData?.vendor_info));

      if (location?.pathname?.includes(navCommunity)) {
        dispatch(deActivateLoginPopup());
      }
    }
  }, [userLoggedinData, vendorLoggedinData]);

  useEffect(() => {
    setLoginData({
      ...loginData,
      country_code: selectedCountry.value,
    });
  }, [selectedCountry]);

  const customSelectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "#dc3545",
      minWidth: 180,
      borderColor: isFocused ? "#dc3545" : "#ced4da",
      outline: "none",
      boxShadow: "none",
    }),
  };

  return (
    <>
      <form>
        <div className="custom-control custom-switch text-left mb-4">
          <input
            type="checkbox"
            className="custom-control-input"
            id="login__with__mobile"
            onChange={(e) => setLoginWithMobile(e.target.checked)}
            checked={loginWithMobile}
          />
          <label className="custom-control-label" htmlFor="login__with__mobile">
            Login with Mobile
          </label>
        </div>

        {!loginWithMobile && (
          <div className="form-group">
            <div className="input__control">
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyUp={handleBlur}
                value={loginData.email}
                className={
                  errors?.email ? "form-control error" : "form-control"
                }
                placeholder="Email address"
                required=""
                autoFocus=""
                autoComplete="off"
              />
              <label htmlFor="email">Email Address</label>
            </div>
            {errors?.email && <span className="error">{errors?.email}</span>}
          </div>
        )}

        {loginWithMobile && (
          <div className="form-group">
            <div className="mobile__input">
              <Select
                styles={customSelectStyles}
                name="country_code"
                onChange={(code) => setSelectedCountry(code)}
                value={selectedCountry}
                options={countriesList}
              />

              <div className="input__control">
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  value={loginData.mobile}
                  className={
                    errors?.mobile ? "form-control error" : "form-control"
                  }
                  placeholder="mobile number"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="mobile">Mobile Number</label>
                {errors?.mobile && (
                  <span className="error">{errors?.mobile}</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <div className="input__control">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={handleBlur}
              value={loginData.password}
              className={
                errors?.password ? "form-control error" : "form-control"
              }
              placeholder="Password"
              required=""
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
          </div>
          {errors?.password && (
            <span className="error">{errors?.password}</span>
          )}

          <div className="text-right">
            <Link to="/forgot-password" id="forgot_pswd">
              Forgot password?
            </Link>
          </div>
        </div>

        {userLoggedinData?.status === 0 && (
          <div className="alert alert-danger" role="alert">
            {userLoggedinData?.msg}
          </div>
        )}

        {vendorLoggedinData?.status === 0 && (
          <div className="alert alert-danger" role="alert">
            {vendorLoggedinData?.msg}
          </div>
        )}

        {userLoggedinData?.status === 1 && (
          <div className="alert alert-success" role="alert">
            {userLoggedinData?.msg}
          </div>
        )}

        {vendorLoggedinData?.status === 1 && (
          <div className="alert alert-success" role="alert">
            {vendorLoggedinData?.msg}
          </div>
        )}

        <button
          className="btn submit__btn"
          type="submit"
          onClick={handleSubmit}
        >
          {UserRole === 2 &&
            (userLoading ? (
              <Loader type="white" />
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign in
              </>
            ))}

          {UserRole === 3 &&
            (vendorLoading ? (
              <Loader type="white" />
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign in
              </>
            ))}
        </button>
      </form>
    </>
  );
};

export default LoginForm;

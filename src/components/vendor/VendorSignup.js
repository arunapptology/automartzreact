import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import PageTitle from "../ui/PageTitle";
import { signupValidation } from "../formValidation/signupValidation";
import { vendorTypesList } from "../../store/vendorTypesList";

import { useGetVendorSignupMutation } from "../../services/vendorApi";
import Loader from "../loader";
import { navVendorVerify } from "../navbar/navigationSlugs";

function VendorSignup() {
  let history = useHistory();
  const { countriesList } = useSelector((state) => state.locationReducer);
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);

  const [callSignUpAPI, { data: SignupReturnData, isLoading }] =
    useGetVendorSignupMutation();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyname: "",
    fullname: "",
    email: "",
    country_code: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    vendor_type: [],
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gst: "",
    referral_code: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vendor_type") {
      if (e.target.checked) {
        setFormData({
          ...formData,
          [name]: [...formData?.[name], value],
        });
        return;
      } else {
        const unChechedItem = formData?.[name]?.filter(
          (item) => item !== value
        );
        setFormData({
          ...formData,
          [name]: unChechedItem,
        });
        return;
      }
    }

    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { formErrors } = signupValidation(formData);

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

    const { formErrors, formIsValid } = signupValidation(formData);
    if (!formIsValid) {
      setErrors(formErrors);
    }

    if (formIsValid) {
      let dataForm = new FormData();

      dataForm.append("companyname", formData?.companyname);
      dataForm.append("fullname", formData?.fullname);
      dataForm.append("email", formData?.email);
      dataForm.append("country_code", formData?.country_code);
      dataForm.append("mobile", formData?.mobile);
      dataForm.append("password", formData?.password);
      dataForm.append("vendor_type", formData?.vendor_type);
      dataForm.append("age", formData?.age);
      dataForm.append("address", formData?.address);
      dataForm.append("city", formData?.city);
      dataForm.append("state", formData?.state);
      dataForm.append("pincode", formData?.pincode);
      dataForm.append("country", formData?.country);
      dataForm.append("gst", formData?.gst);
      dataForm.append("referral_code", formData?.referral_code);
      dataForm.append("profile_image", formData?.profile_image);

      callSignUpAPI(dataForm);
    }
  };

  useEffect(() => {
    if (SignupReturnData?.status === 1) {
      const redirectToVerification = setTimeout(
        () =>
          history.replace(
            `${navVendorVerify}/${SignupReturnData?.vendor_info?.Id}`
          ),
        1000
      );
      return () => {
        clearTimeout(redirectToVerification);
      };
    }
  }, [SignupReturnData]);

  useEffect(() => {
    setFormData({
      ...formData,
      country_code: selectedCountry.value,
      country: selectedCountry.countryName,
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
      <div id="logreg-forms">
        <div className="form-signup">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <PageTitle title="vendor signup" />
            </div>

            <div className="text-center my-3">
              <span className="txt3">Already have an account? </span>
              <Link to="/vendor-login">Login here</Link>
            </div>

            {/* <div className="social-login-main">
            <div className="social-login">
              <button className="btn facebook-btn social-btn" type="button">
                <span>
                  <i className="fa fa-facebook-f"></i> Sign up with Facebook
                </span>{" "}
              </button>
            </div>

            <div className="social-login">
              <button className="btn google-btn social-btn" type="button">
                <span>
                  <i className="fa fa-google"></i> Sign up with Google
                </span>{" "}
              </button>
            </div>
          </div>

          <div className="or-seperator">
            <b>or</b>
          </div> */}

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="companyname"
                      name="companyname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.companyname}
                      className={
                        errors?.companyname
                          ? "form-control error"
                          : "form-control"
                      }
                      placeholder="company name"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="companyname">company Name</label>
                  </div>
                  {errors?.companyname && (
                    <span className="error">{errors?.companyname}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.fullname}
                      className={
                        errors?.fullname ? "form-control error" : "form-control"
                      }
                      placeholder="Full name"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="fullname">Full Name</label>
                  </div>
                  {errors?.fullname && (
                    <span className="error">{errors?.fullname}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.email}
                      className={
                        errors?.email ? "form-control error" : "form-control"
                      }
                      placeholder="Email ID"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="email">Email ID</label>
                  </div>
                  {errors?.email && (
                    <span className="error">{errors?.email}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <Select
                  styles={customSelectStyles}
                  name="country_code"
                  onChange={(code) => setSelectedCountry(code)}
                  value={selectedCountry}
                  options={countriesList}
                />
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="number"
                      id="mobile"
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.mobile}
                      className={
                        errors?.mobile ? "form-control error" : "form-control"
                      }
                      placeholder="mobile number"
                      required=""
                      autoComplete="off"
                    />
                    <label htmlFor="mobile">Mobile Number</label>
                  </div>
                  {errors?.mobile && (
                    <span className="error">{errors?.mobile}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.password}
                      className={
                        errors?.password ? "form-control error" : "form-control"
                      }
                      placeholder="password"
                      required=""
                      autoComplete="off"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  {errors?.password && (
                    <span className="error">{errors?.password}</span>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyUp={handleBlur}
                      value={formData.confirmPassword}
                      className={
                        errors?.confirmPassword
                          ? "form-control error"
                          : "form-control"
                      }
                      placeholder="confirm Password"
                      required=""
                      autoComplete="off"
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  {errors?.confirmPassword && (
                    <span className="error">{errors?.confirmPassword}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <h6>Vendor Type</h6>
                  <div className="row">
                    {vendorTypesList.map((item, i) => (
                      <div className="col-md-4" key={i}>
                        <div className="custom__checkbox">
                          <input
                            type="checkbox"
                            id={item?.label}
                            name="vendor_type"
                            value={item?.value}
                            onChange={handleChange}
                          />
                          <label htmlFor={item?.label}>{item?.label}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      value={formData.address}
                      className="form-control"
                      placeholder="address"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="address">address</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      className="form-control"
                      placeholder="city"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="city">city</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                      className="form-control"
                      placeholder="state"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="state">state</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      onChange={handleChange}
                      value={formData.pincode}
                      className="form-control"
                      placeholder="pin code"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="pincode">pin code</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="gst"
                      name="gst"
                      onChange={handleChange}
                      value={formData.gst}
                      className="form-control"
                      placeholder="GST"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="gst">GST</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
                      id="referral_code"
                      name="referral_code"
                      onChange={handleChange}
                      value={formData.referral_code}
                      className="form-control"
                      placeholder="referral code"
                      required=""
                      autoFocus=""
                      autoComplete="off"
                    />
                    <label htmlFor="referral_code">referral code</label>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="box-fileupload mb-3">
                  <input
                    type="file"
                    onChange={handleChange}
                    className="filetype"
                    name="profile_image"
                  />

                  <span className="box-fileupload__lable">
                    upload vendor image
                  </span>
                </div>

                {image ? (
                  <img
                    className="image-prev img-fluid mx-auto d-block"
                    src={image}
                    alt="preview image"
                  />
                ) : null}
              </div>
            </div>

            <button className="btn submit__btn my-3" type="submit">
              {!isLoading && (
                <>
                  <i className="fas fa-user-plus"></i> Sign up
                </>
              )}
              {isLoading && <Loader type="white" />}
            </button>

            {SignupReturnData?.status === 0 && (
              <div className="alert alert-danger" role="alert">
                {SignupReturnData?.msg}
              </div>
            )}
            {SignupReturnData?.status === 1 && (
              <div className="alert alert-success" role="alert">
                {SignupReturnData?.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default VendorSignup;

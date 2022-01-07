import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import PageTitle from "../ui/PageTitle";
import { signupValidation } from "../formValidation/signupValidation";
import axios from "axios";

function UserSignup() {
  let history = useHistory();
  const { countriesList } = useSelector((state) => state.locationReducer);
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);

  const [errors, setErrors] = useState({});
  const [regisMsg, setRegisMsg] = useState({});
  const [sendingData, setSendingData] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    country_code: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    state: "",
    country: "",
    profile_image: "",
  });

  // const [fusers, setfData] = useState([]);

  // const responseFacebook = (response) => {
  //   setfData(response);
  // };

  // const componentClicked = (data) => {};

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
    setSendingData(true);
    const { formErrors, formIsValid } = signupValidation(formData);
    if (!formIsValid) {
      setErrors(formErrors);
      setSendingData(false);
    }

    if (formIsValid) {
      let dataForm = new FormData();
      dataForm.append("fullname", formData?.fullname);
      dataForm.append("email", formData?.email);
      dataForm.append("country_code", formData?.country_code);
      dataForm.append("mobile", formData?.mobile);
      dataForm.append("password", formData?.password);
      dataForm.append("gender", formData?.gender);
      dataForm.append("age", formData?.age);
      dataForm.append("address", formData?.address);
      dataForm.append("city", formData?.city);
      dataForm.append("state", formData?.state);
      dataForm.append("country", formData?.country);
      dataForm.append("profile_image", formData?.profile_image);

      axios({
        method: "post",
        url: process.env.REACT_APP_USER_REGISTRATION_URL,
        data: dataForm,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((res) => {
          const { status, msg } = res?.data;
          setSendingData(false);

          if (status === 1) {
            setRegisMsg({
              status,
              msg,
            });
            console.log(res?.data?.user_info);
            const redirectToVerification = setTimeout(
              () => history.replace(`/user-verify/${res?.data?.user_info?.Id}`),
              3000
            );
            return () => {
              clearTimeout(redirectToVerification);
            };
          }
          if (status === 0) {
            setRegisMsg({
              status,
              msg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      borderColor: "#002f5b",
      minWidth: 180,
      borderColor: isFocused ? "#002f5b" : "#ced4da",
      outline: "none",
      boxShadow: "none",
    }),
  };

  useEffect(() => {
    if (regisMsg) {
      let regisMsgTimeout = setTimeout(() => setRegisMsg({}), 3000);
      return () => {
        clearTimeout(regisMsgTimeout);
      };
    }
  }, [regisMsg, setRegisMsg]);

  return (
    <>
      <div id="logreg-forms">
        <div className="form-signup">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="text-center">
              <PageTitle title="user signup" />
            </div>

            <div className="text-center my-3">
              <span className="txt3">Already have an account? </span>
              <Link to="/user-login">Login here</Link>
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

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="text"
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
                <div className="genrow">
                  <div className="row align-items-center">
                    <div className=" col-md-6">
                      {" "}
                      <p>Select User gender</p>{" "}
                    </div>

                    <div className="col-md-6">
                      <div className="custom__input__radio">
                        <div className="radio__option">
                          <input
                            type="radio"
                            id="fat"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                          />
                          <label htmlFor="fat">Male</label>
                        </div>
                        <div className="radio__option">
                          <input
                            type="radio"
                            id="fit"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                          />
                          <label htmlFor="fit">Female</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="input__control">
                    <input
                      type="number"
                      id="age"
                      name="age"
                      onChange={handleChange}
                      value={formData.age}
                      className="form-control"
                      placeholder="age"
                      required=""
                      autoComplete="off"
                    />
                    <label htmlFor="age">age</label>
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

              <div className="col-md-12">
                <div className="box-fileupload mb-3">
                  <input
                    type="file"
                    onChange={handleChange}
                    className="filetype"
                    name="profile_image"
                  />

                  <span className="box-fileupload__lable">
                    upload user image
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
              {!sendingData && (
                <>
                  <i className="fas fa-user-plus"></i> Sign up
                </>
              )}
              {sendingData && "Sending Data..."}
            </button>

            {regisMsg?.status === 0 && (
              <div className="alert alert-danger" role="alert">
                {regisMsg?.msg}
              </div>
            )}
            {regisMsg?.status === 1 && (
              <div className="alert alert-success" role="alert">
                {regisMsg?.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSignup;

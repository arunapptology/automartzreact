import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import PageTitle from "./PageTitle";

const ForgotPassword = () => {
  const history = useHistory();

  const [activateMobile, setActivateMobile] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    selectedCountryCode: "",
    mobile: "",
    user_role: "2",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const countryCodes = [{ value: "91", label: "+91-India" }];
  useEffect(() => {
    setLoginData({ ...loginData, selectedCountryCode: countryCodes[0] });
  }, []);

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
    <Fragment>
      <div id="logreg-forms">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <PageTitle title="forgot password" />
            <p style={{ fontSize: 14 }}>
              Enter your registered Email ID or <br /> Mobile number to reset
              your password.
            </p>
          </div>

          <div className="custom-control custom-switch text-left pt-3 pb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="activate__mobile"
              onChange={(e) => setActivateMobile(e.target.checked)}
              checked={activateMobile}
              defaultChecked={activateMobile}
            />
            <label className="custom-control-label" htmlFor="activate__mobile">
              Reset by Mobile
            </label>
          </div>

          {!activateMobile && (
            <div className="form-group">
              <div className="input__control">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
          )}

          {activateMobile && (
            <div className="form-group mobile__input">
              <Select
                styles={customSelectStyles}
                name="selectedCountryCode"
                onChange={(value) =>
                  setLoginData({
                    ...loginData,
                    selectedCountryCode: value,
                  })
                }
                value={loginData.selectedCountryCode}
                options={countryCodes}
              />

              <div className="input__control">
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  value={loginData.mobile}
                  className="form-control"
                  placeholder="mobile number"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="mobile">Mobile Number</label>
              </div>
            </div>
          )}

          <div className="row pt-3">
            <div className="offset-md-4 col-md-4">
              <button className="btn submit__btn" type="submit">
                Reset Password
              </button>
            </div>

            <div className="col-md-4">
              <button className="btn reset__btn" onClick={history.goBack}>
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;

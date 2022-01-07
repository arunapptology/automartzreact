import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";

import PageTitle from "./PageTitle";
import axios from "axios";

const Verify = () => {
  const history = useHistory();
  const params = useParams();

  const [inputOTP, setInputOTP] = useState("");
  const [sendingData, setSendingData] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputOTP && inputOTP.length === 6) {
      setSendingData(true);
      let dataForm = new FormData();

      dataForm.append("otp", inputOTP);

      if ("vendorId" in params) {
        dataForm.append("Id", params?.vendorId);
        dataForm.append("UserRole", 3);
      }

      if ("userId" in params) {
        dataForm.append("Id", params?.userId);
        dataForm.append("UserRole", 2);
      }

      axios({
        method: "post",
        url: process.env.REACT_APP_VERIFICATION_URL,
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
            setVerificationMsg({ status, msg });
            let redirectToLogin;
            if ("vendorId" in params) {
              redirectToLogin = setTimeout(
                () => history.replace(`/vendor-login`),
                1500
              );
            }
            if ("userId" in params) {
              redirectToLogin = setTimeout(
                () => history.replace(`/user-login`),
                1500
              );
            }
            return () => {
              clearTimeout(redirectToLogin);
            };
          }
          if (status === 0) {
            setVerificationMsg({ status, msg });
          }
          setInputOTP("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div id="logreg-forms">
        <form onSubmit={handleSubmit} className="py-5">
          <div className="text-center">
            <PageTitle title="complete verification" />
            <p style={{ fontSize: 14 }}>
              Enter the OTP you have received via Email or Mobile
            </p>
          </div>
          <div className="otp__input py-4">
            <OtpInput
              value={inputOTP}
              onChange={(value) => setInputOTP(value)}
              numInputs={6}
              placeholder="123456"
              separator={<span>-</span>}
              isInputNum
              shouldAutoFocus
              isInputSecure
            />
          </div>

          {verificationMsg?.status === 0 && (
            <div className="alert alert-danger" role="alert">
              {verificationMsg?.msg}
            </div>
          )}
          {verificationMsg?.status === 1 && (
            <div className="alert alert-success" role="alert">
              {verificationMsg?.msg}
            </div>
          )}

          <div className="row pt-3">
            <div className="offset-md-2 col-md-4">
              <button className="btn submit__btn" type="submit">
                {!sendingData ? " verify" : "verifying..."}
              </button>
            </div>

            <div className="col-md-4">
              <button
                className="btn reset__btn"
                onClick={() => history.replace("/")}
              >
                Back To Home
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Verify;

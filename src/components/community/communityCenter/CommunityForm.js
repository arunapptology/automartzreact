import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activateLoginPopup } from "../../../slices/communitySlice";

const CommunityForm = () => {
  const dispatch = useDispatch();

  const { isUserLoggedin, loggedinUserInfo } = useSelector(
    (state) => state.userReducer
  );

  const { isVendorLoggedin, loggedinVendorInfo } = useSelector(
    (state) => state.vendorReducer
  );

  const [errors, setErrors] = useState("");
  const [inputResponse, setInputResponse] = useState("");

  const handleChange = (e) => {
    setInputResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors) {
      console.log(inputResponse.trim());
      setInputResponse("");
    }
  };

  useEffect(() => {
    if (inputResponse) {
      if (!isUserLoggedin && !isVendorLoggedin) {
        setErrors("You must login to respond!");

        if (inputResponse?.length >= 3) {
          dispatch(activateLoginPopup());
          setInputResponse("");
        }
      } else {
        setErrors("");
      }
    } else {
      setErrors("");
    }
  }, [inputResponse]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="community__form">
          <div className="head">
            <div className="image shadow-sm border">
              {isUserLoggedin && (
                <img
                  src={
                    loggedinUserInfo?.ProfileImage ||
                    "/images/default_image.png"
                  }
                  alt={loggedinUserInfo?.UserName}
                />
              )}

              {!isUserLoggedin && !isVendorLoggedin && (
                <img src={"/images/default_image.png"} alt={"User"} />
              )}

              {isVendorLoggedin && (
                <img
                  src={
                    loggedinVendorInfo?.ProfileImage ||
                    "/images/default_image.png"
                  }
                  alt={loggedinVendorInfo?.UserName}
                />
              )}
            </div>
            <div className="form-group">
              <div className="input__control">
                <input
                  type="text"
                  name="response"
                  onChange={handleChange}
                  value={inputResponse}
                  className={errors ? "form-control error" : "form-control"}
                  placeholder="Write your respond...."
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
              </div>
              {errors && <span className="error">{errors}</span>}
            </div>
          </div>
          {inputResponse.trim() && !errors && (
            <div className="d-flex align-items-center justify-content-end">
              <span
                className="cancel__btn"
                onClick={() => setInputResponse("")}
              >
                Cancel
              </span>
              <button className="custom__btn" type="submit">
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CommunityForm;

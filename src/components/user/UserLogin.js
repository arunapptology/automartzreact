// import FacebookLogin from "react-facebook-login";
// import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import PageTitle from "../ui/PageTitle";
import LoginForm from "../ui/LoginForm";
import { navCommunity, navUserDashboard } from "../navbar/navigationSlugs";
import { useDispatch, useSelector } from "react-redux";
import { deActivateLoginPopup } from "../../slices/communitySlice";

function UserLogin() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUserLoggedin } = useSelector((state) => state.userReducer);
  // const [fusers, setfData] = useState([]);

  // const responseFacebook = (response) => {
  //   setfData(response);
  // };

  // const componentClicked = (data) => {};

  if (isUserLoggedin) {
    history.replace(navUserDashboard);
  }

  return (
    <>
      <div id="logreg-forms">
        <div className="form-signin">
          <div className="text-center">
            <PageTitle title="user login" />
          </div>

          {/* <div className="social-login text-center">
            <span className="btn facebook-btn social-btn" type="button">
              <i className="fa fa-facebook-f"></i>{" "}
              <FacebookLogin
                appId="720330231688401"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
              />
            </span>
            <span className="btn google-btn social-btn" type="button">
              <span>
                <i className="fa fa-google"></i> Sign in with Google
              </span>
            </span>
          </div>
          <p className="my-3 text-center"> OR </p> */}

          <LoginForm UserRole={2} />

          <p className="text-center mt-3">
            New User? <Link to="/user-signup">Sign Up Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default UserLogin;

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  activateLoginPopup,
  activateQuestionForm,
} from "../../../slices/communitySlice";
import { navUserLogin, navUserSignup } from "../../navbar/navigationSlugs";
import CommunityProfile from "./CommunityProfile";

const RightList = () => {
  const dispatch = useDispatch();
  const { isUserLoggedin } = useSelector((state) => state.userReducer);
  const { isVendorLoggedin } = useSelector((state) => state.vendorReducer);
  return (
    <>
      <div className="list__container">
        <CommunityProfile />
        <div className="community__profile__actions text-center mt-4">
          {(isUserLoggedin || isVendorLoggedin) && (
            <a
              className="custom__btn"
              onClick={() => dispatch(activateQuestionForm())}
              href="#question__form"
            >
              Add New Question
            </a>
          )}
          {!isUserLoggedin && !isVendorLoggedin && (
            <>
              <span
                className="custom__btn"
                onClick={() => dispatch(activateLoginPopup())}
              >
                Login
              </span>
              <br />
              <span>
                New User?{" "}
                <Link to={navUserSignup} className="text-danger">
                  Signup here
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RightList;

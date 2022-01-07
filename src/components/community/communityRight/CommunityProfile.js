import { useSelector } from "react-redux";

const CommunityProfile = () => {
  const { isUserLoggedin, loggedinUserInfo } = useSelector(
    (state) => state.userReducer
  );
  const { isVendorLoggedin, loggedinVendorInfo } = useSelector(
    (state) => state.vendorReducer
  );
  return (
    <>
      <div className="community__profile">
        <div className="image shadow-sm border">
          <img
            src={
              isUserLoggedin
                ? loggedinUserInfo?.ProfileImage
                : "/images/user_icon.png"
            }
            alt={isUserLoggedin ? loggedinUserInfo?.FullName : "User"}
          />

          {isVendorLoggedin && (
            <img
              src={
                isVendorLoggedin
                  ? loggedinVendorInfo?.ProfileImageUrl
                  : "/images/user_icon.png"
              }
              alt={isVendorLoggedin ? loggedinVendorInfo?.FullName : "User"}
            />
          )}
        </div>
        {(isUserLoggedin || isVendorLoggedin) && (
          <>
            <h4 className="profile__name">
              {loggedinUserInfo?.FullName}
              {loggedinVendorInfo?.FullName}
            </h4>
            <div className="profile__card border shadow">
              <div className="user__type">
                {loggedinUserInfo?.UserRole === "2" && "User"}
                {loggedinVendorInfo?.UserRole === "3" && "Vendor"}
              </div>
              <ul>
                <li>
                  <span className="icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </span>
                  <h4 className="item__content">
                    {loggedinUserInfo?.Mobile}
                    {loggedinVendorInfo?.Mobile}
                  </h4>
                </li>
                <li>
                  <span className="icon">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <h4 className="item__content">
                    {loggedinUserInfo?.Email}
                    {loggedinVendorInfo?.Email}
                  </h4>
                </li>
                <li>
                  <span className="icon">
                    <i className="fa fa-location-arrow" aria-hidden="true"></i>
                  </span>
                  {isUserLoggedin && (
                    <h4 className="item__content">
                      {loggedinUserInfo?.Address}, {loggedinUserInfo?.City},{" "}
                      {loggedinUserInfo?.State}, {loggedinUserInfo?.country}
                    </h4>
                  )}
                  {isVendorLoggedin && (
                    <h4 className="item__content">
                      {loggedinVendorInfo?.Address}, {loggedinVendorInfo?.City},{" "}
                      {loggedinVendorInfo?.State}, {loggedinVendorInfo?.country}
                    </h4>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CommunityProfile;

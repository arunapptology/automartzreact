import moment from "moment";

const defaultImage = "/images/user_icon.png";

const ProfileItem = ({ info }) => {
  let packageTypeName;
  switch (info?.packageType) {
    case "1":
      packageTypeName = "Basic";
      break;

    case "2":
      packageTypeName = "Primimum";
      break;

    case "3":
      packageTypeName = "Gold";
      break;

    default:
      break;
  }
  return (
    <>
      {/* <div className="upper">
        <img
          src="/images/prfoile_bg.jpg"
          className="img-fluid"
          alt="bg-image"
        />
      </div> */}
      <div className="user text-center p-3">
        <div className="profile">
          <img
            src={info?.ProfileImage || defaultImage}
            className="rounded-circle"
            width="80"
            alt={info?.FullName}
          />
        </div>
        <h4 className="mb-0 mt-2">{info?.FullName}</h4>
        <span>Member since - {moment(info?.CreatedOn).format("MMM YY")} </span>
      </div>
      {/* <div className="mt-5 text-center">
        <span className="text-muted d-block mb-2 text-capitalize">
          {info?.Address}, {info?.City}, {info?.State}, {info?.country}
        </span>
        <div className="d-flex justify-content-between align-items-center mt-3 px-4">
          <div className="stats">
            <h6 className="mb-0 text-capitalize">Points</h6>
            <span>{info?.points || 0}</span>
          </div>
          <div className="stats">
            <h6 className="mb-0 text-capitalize">Type</h6>
            <span>
              <button className="btn btn-success">{packageTypeName}</button>
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProfileItem;

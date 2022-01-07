const TopStats = ({ info }) => {
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
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow mb-2 h-100">
            <div className="card-body p-3 d-flex align-items-center">
              <img
                src={info?.ProfileImage || "/images/user_icon.png"}
                className="img-fluid"
                width="40"
                alt={info?.FullName}
              />

              <p className="mb-0 ml-3">{`${packageTypeName} ${
                info?.UserRole === "2"
                  ? "User"
                  : info?.UserRole === "3"
                  ? "Vendor"
                  : null
              }`}</p>
              <span className="custom__btn btn__sm ml-auto">Upgrade</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow mb-2 h-100">
            <div className="card-body p-3 d-flex align-items-center">
              {/* <img
                src={info?.ProfileImage || "/images/user_icon.png"}
                className="img-fluid"
                width="40"
                alt={info?.FullName}
              /> */}

              <p className="mb-0 ml-3">Total Points</p>
              <span
                className="ml-auto d-inline-block"
                style={{ fontSize: 30, fontWeight: 500 }}
              >
                {info?.points || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow mb-2 h-100">
            <div className="card-body p-3 d-flex align-items-center">
              {/* <img
                src={info?.ProfileImage || "/images/user_icon.png"}
                className="img-fluid"
                width="40"
                alt={info?.FullName}
              /> */}

              <p className="mb-0 ml-3">Total Enquiry</p>
              <span
                className="ml-auto d-inline-block"
                style={{ fontSize: 30, fontWeight: 500 }}
              >
                {info?.points || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopStats;

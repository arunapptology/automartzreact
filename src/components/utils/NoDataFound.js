const NoDataFound = ({ title, subtitle }) => {
  return (
    <>
      <div className="card shadow alert alert-danger text-center py-5">
        <h5 style={{ fontSize: 36 }}>{title ? title : "No Result Found!"}</h5>
        {subtitle ? (
          subtitle
        ) : (
          <p>
            Looke like we couldn't found what you were loking for. <br /> Try
            some other keywords.
          </p>
        )}
      </div>
    </>
  );
};

export default NoDataFound;

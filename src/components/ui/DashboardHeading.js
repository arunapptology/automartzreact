const DashboardHeading = ({ title, children }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2 className="mb-0" style={{ fontSize: 24 }}>
          {title}
        </h2>
        {children && children}
      </div>
    </>
  );
};

export default DashboardHeading;

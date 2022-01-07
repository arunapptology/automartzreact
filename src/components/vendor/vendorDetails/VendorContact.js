const VendorContact = ({ vendorInfo }) => {
  return (
    <>
      <h5 className="d-flex align-items-center mb-3">Contact Details</h5>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{vendorInfo?.FullName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{vendorInfo?.Email}</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>{vendorInfo?.Mobile}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{vendorInfo?.Address}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{vendorInfo?.City}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{vendorInfo?.State}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VendorContact;

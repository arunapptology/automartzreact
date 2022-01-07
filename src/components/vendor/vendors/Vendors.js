import VendorsSidebar from "./vendorsSidebar";

import "./Vendors.css";
import VendorsResult from "./VendorsResult";

const Vendors = () => {
  return (
    <>
      <div className="container">
        <div className="py-5">
          <div className="row">
            <div className="col-md-3">
              <VendorsSidebar />
            </div>
            <div className="col-md-9">
              <VendorsResult />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;

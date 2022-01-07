import { Link, useHistory } from "react-router-dom";

import PageTitle from "../ui/PageTitle";
import LoginForm from "../ui/LoginForm";
import { useSelector } from "react-redux";
import { navVendorDashboard } from "../navbar/navigationSlugs";

function VendorLogin() {
  const history = useHistory();
  const { isVendorLoggedin } = useSelector((state) => state.vendorReducer);

  if (isVendorLoggedin) {
    history.replace(navVendorDashboard);
  }
  return (
    <>
      <div id="logreg-forms">
        <div className="form-signin">
          <div className="text-center">
            <PageTitle title="vendor login" />
          </div>

          <LoginForm UserRole={3} />

          <p className="text-center mt-3">
            New Vendor? <Link to="/vendor-signup">Sign Up Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default VendorLogin;

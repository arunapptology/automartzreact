import DashboardHeading from "../../ui/DashboardHeading";
import BuySellForm from "./forms/BuySellForm";
import FormPreview from "./forms/FormPreview";

const UploadStockBuySell = () => {
  return (
    <>
      <div className="stock__form">
        <div className="row">
          <div className="col-md-7">
            <div className="card p-4 mb-3">
              <DashboardHeading title={"Upload Buy & Sell Stocks"} />
              <BuySellForm />
            </div>
          </div>
          <div className="col-md-5">
            <div
              className="card shadow p-4 mb-3"
              style={{ position: "sticky", top: 0 }}
            >
              <DashboardHeading title={"Preview"} />
              <FormPreview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadStockBuySell;

import DashboardHeading from "../../ui/DashboardHeading";
import BuySellForm from "./forms/BuySellForm";

const UploadStockAccessories = () => {
  return (
    <>
      <div className="card p-4 mb-3">
        <DashboardHeading title={"Upload Accessories Stocks"} />
        <BuySellForm />
      </div>
    </>
  );
};

export default UploadStockAccessories;

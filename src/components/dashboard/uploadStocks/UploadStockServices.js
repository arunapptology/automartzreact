import DashboardHeading from "../../ui/DashboardHeading";
import BuySellForm from "./forms/BuySellForm";

const UploadStockServices = () => {
  return (
    <>
      <div className="card p-4 mb-3">
        <DashboardHeading title={"Upload Services Stocks"} />
        <BuySellForm />
      </div>
    </>
  );
};

export default UploadStockServices;

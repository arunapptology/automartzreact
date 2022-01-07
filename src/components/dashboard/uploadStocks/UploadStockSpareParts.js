import DashboardHeading from "../../ui/DashboardHeading";
import SparePartsForm from "./forms/SparePartsForm";

const UploadStockSpareParts = () => {
  return (
    <>
      <div className="card p-4 mb-3">
        <DashboardHeading title={"Upload Spare Parts Stocks"} />
        <SparePartsForm />
      </div>
    </>
  );
};

export default UploadStockSpareParts;

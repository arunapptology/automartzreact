import AskPriceForm from "../../ui/AskPriceForm";
import OfferValidity from "./OfferValidity";
import StockBestDealers from "./StockBestDealers";
import StockMap from "./StockMap";

const StockSidebar = ({ item }) => {
  return (
    <>
      <aside className="sidebar shadow-sm">
        <div className="widget text-center">
          <OfferValidity item={item} />
        </div>
        <div className="widget text-center ">
          <div className="border shadow-sm sidebar__contact">
            <h4 className="subtitle text-center">Contact Vendor</h4>
            <p>Enter your number to get connected with the vendor. </p>
            <AskPriceForm numberOnly />
          </div>
        </div>
        <div className="widget">
          <StockMap item={item} />
        </div>
        <div className="widget">
          <StockBestDealers item={item} />
        </div>
      </aside>
    </>
  );
};

export default StockSidebar;

import { useDispatch } from "react-redux";
import { getUserInquiryItem } from "../../../slices/globalSlice";

const StockBestDealers = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="get__best__dealers text-center border shadow-sm">
        <h4 className="subtitle text-center">Get The Top Vendors</h4>
        <p>
          Searching for the top vednors?
          <br /> We will help you out to get the best product from the top
          dealers.{" "}
        </p>
        <span
          className="custom__btn"
          data-toggle="modal"
          data-target="#askPriceModal"
          onClick={() => dispatch(getUserInquiryItem(item))}
        >
          Get The Top Vendors
        </span>
      </div>
    </>
  );
};

export default StockBestDealers;

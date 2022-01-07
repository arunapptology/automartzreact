import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInquiryItem } from "../../slices/globalSlice";
import Loader from "../loader";
import AskPriceForm from "./AskPriceForm";

const AskPriceModal = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const { userInquiryItem } = useSelector((state) => state.globalReducer);

  const [imageError, setImageError] = useState(false);

  let image;
  if (userInquiryItem?.imagePath && userInquiryItem?.ProductImage) {
    image = `${userInquiryItem?.imagePath}/${userInquiryItem?.ProductImage}`;
  } else if (userInquiryItem?.productimage) {
    image = `${process.env.REACT_APP_API_URL}/${userInquiryItem?.productimage}`;
  }
  return (
    <>
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: 700 }}
      >
        <div className="modal-content">
          <div
            className="modal-header p-0 border-0"
            style={{ position: "absolute", right: 10, top: 15, zIndex: 1 }}
          >
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => dispatch(getUserInquiryItem())}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
          <div className="row">
            <div className="col-md-4 pt-5 pb-4 px-4">
              <div className="pl-4 pr-2">
                {!userInquiryItem?.Id && <Loader />}
                {userInquiryItem?.Id && (
                  <div className="card text-center shadow-none">
                    <img
                      src={!imageError ? image : "/images/default_image.png"}
                      onError={() => setImageError(true)}
                      alt={userInquiryItem?.ProductName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {userInquiryItem?.ProductName}
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-8 bg-light pt-5 pb-4 px-4">
              <h5 className="card-title">
                {title ? title : "Ask for price and details"}
              </h5>
              <p>
                {subtitle
                  ? subtitle
                  : "Enter Your Mobile Number and Pin Code to get all available vendors in your area."}
              </p>
              <AskPriceForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskPriceModal;

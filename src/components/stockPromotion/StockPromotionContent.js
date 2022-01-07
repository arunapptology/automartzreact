import moment from "moment";
import Count from "../Count";

const StockPromotionContent = ({ item }) => {
  return (
    <>
      <div className="stock__promotion__content ">
        <h4 className="title text-capitalize">{item?.ProductName}</h4>
        <div className="price">
          {item?.discount > 0 && (
            <>
              <p className="actual__price">
                <del>
                  <i className="fa fa-inr"></i>
                  {item?.PricePerPieces}
                </del>
              </p>
              <p className="offer__price">
                <i className="fa fa-inr"></i>
                {item?.PricePerPieces -
                  (item?.PricePerPieces * item?.discount) / 100}
              </p>
              <span className="save">saved {item?.discount}%</span>
            </>
          )}
        </div>

        <div className="overview content__card">
          <h4 className="subtitle">Overview</h4>
          <div className="row">
            <div className="col-md-12 overview__item">
              <div className="icon">
                <i className="fa fa-user-o"></i>
              </div>
              <div className="overview__content">
                {item?.UserRole === "2" && <span>Owner</span>}
                {item?.UserRole === "3" && <span>Vendor</span>}
                <p>{item?.FullName}</p>
              </div>
            </div>
            <div className="col-md-12 overview__item">
              <div className="icon">
                <i className="fa fa-map-marker"></i>
              </div>
              <div className="overview__content">
                <span>Location</span>
                <p>{item?.Address}</p>
              </div>
            </div>
            <div className="col-md-12 overview__item">
              <div className="icon">
                <i className="fa fa-calendar"></i>
              </div>
              <div className="overview__content">
                <span>Posting Date</span>
                {item?.ModifiedOn && (
                  <p>
                    {moment(item?.ModifiedOn).format("MMM Do YY")}
                    <small> (Modified)</small>
                  </p>
                )}
                {!item?.ModifiedOn && (
                  <p>{moment(item?.CreatedOn).format("MMM Do YY")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockPromotionContent;

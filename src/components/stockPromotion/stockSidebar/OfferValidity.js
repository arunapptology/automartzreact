import moment from "moment";
import Count from "../../Count";

const OfferValidity = ({ item }) => {
  return (
    <>
      {item?.ValidTill && (
        <div className="time__period">
          {new Date(item?.ValidTill) > new Date() ? (
            <>
              <h4>
                Hurry Up!
                <br />
                <small>Offer Ends in</small>
              </h4>
              <Count deadliness={item?.ValidTill} />
            </>
          ) : (
            <>
              <h4 className="">
                Offer Expired <small>on</small>
              </h4>
              <p className="mb-0">
                {moment(item?.ValidTill).format("MMMM Do YYYY")}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OfferValidity;

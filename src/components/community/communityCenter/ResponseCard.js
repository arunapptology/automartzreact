import moment from "moment";

const ResponseCard = ({ item }) => {
  return (
    <>
      <div className="response__card" id={item?.Id}>
        <div className="head">
          <div className="image shadow-sm border">
            <img
              src={item?.ProfileImage || "/images/default_image.png"}
              alt={item?.UserName}
              id={item?.Id}
            />
          </div>
          <div className="name__timing ml-2">
            <p className="name">{item?.UserName}</p>
          </div>
        </div>
        <div className="desc">
          <p>{item?.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ResponseCard;

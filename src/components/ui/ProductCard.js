import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInquiryItem } from "../../slices/globalSlice";
import { navProductDetails, navVendors } from "../navbar/navigationSlugs";

const ProductCard = ({ item, categoryId }) => {
  const [productImage] = useState(
    `${process.env.REACT_APP_API_URL}/${item?.productimage}`
  );
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="card">
        <div className="card__header">
          <Link to={`${navProductDetails}/${item?.Id}/${categoryId}`}>
            <img
              src={!imageError ? productImage : "/images/default_image.png"}
              onError={() => setImageError(true)}
              className="card-img-top"
              alt={item?.ProductName}
            />
          </Link>
        </div>
        <div className="card-body">
          <h5 className="card-title">{item?.ProductName}</h5>
          <span
            className="ask__button"
            data-toggle="modal"
            data-target="#askPriceModal"
            onClick={() => dispatch(getUserInquiryItem(item))}
          >
            Ask for Price
          </span>
          <Link to={navVendors}>View Vendors</Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

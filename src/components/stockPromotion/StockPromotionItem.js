import { Link } from "react-router-dom";
import Count from "../Count";
import { navStockPromotion } from "../navbar/navigationSlugs";

const StockPromotionItem = ({
  Id,
  maincat,
  UserRole,
  imagePath,
  ProductImage,
  ProductName,
  PricePerPieces,
  ValidTill,
  discount,
  pack,
}) => {
  let maincatbs = "buy&sell";
  let maincatsp = "spareparts";
  let maincatac = "accesories";
  let maincatse = "services";

  const expired = new Date().getTime() > new Date(ValidTill).getTime();
  const discountPrice = PricePerPieces - (PricePerPieces * discount) / 100;

  console.log(ProductImage);

  return (
    <>
      <div
        className={
          expired ? "stock__promotion__item expired" : "stock__promotion__item"
        }
      >
        <Link
          to={`${navStockPromotion}?stockid=${Id}&category=${maincat}&user=${UserRole}`}
          className="stock-images"
        >
          <img
            className="img"
            src={
              ProductImage !== "" && ProductImage !== "null"
                ? `${imagePath}/${ProductImage}`
                : `${imagePath}/coming-soon.jpg`
            }
            alt={ProductName}
          />
          <div className="stock__image__content">
            <span className="view__details">View Details</span>

            <div className="badge-overlay">
              {(() => {
                switch (pack) {
                  case "1":
                    return <span className="top-right badge basic">basic</span>;
                  case "2":
                    return (
                      <span className=" top-right badge silver">Silver</span>
                    );

                  default:
                    return <span className="top-right badge gold">gold</span>;
                }
              })()}
            </div>
            {/* 
            <div className="maincattype">
              <span>
                {(() => {
                  switch (maincat) {
                    case "1":
                      return maincatbs;
                    case "2":
                      return maincatsp;
                    case "3":
                      return maincatac;
                    case "4":
                      return maincatse;
                    default:
                      return "foo";
                  }
                })()}
              </span>
            </div> */}
          </div>
        </Link>
        <div className="item-content">
          <p>
            <Link
              to={`${navStockPromotion}?stockid=${Id}&category=${maincat}&user=${UserRole}`}
              style={{ fontWeight: 500 }}
              className="text-capitalize"
            >
              {ProductName?.length > 23
                ? `${ProductName?.substring(0, 23)}...`
                : ProductName}{" "}
            </Link>
          </p>
          <div className="text-capitalize mb-1">
            in{" "}
            {(() => {
              switch (maincat) {
                case "1":
                  return maincatbs;
                case "2":
                  return maincatsp;
                case "3":
                  return maincatac;
                case "4":
                  return maincatse;
                default:
                  return "foo";
              }
            })()}
          </div>
          <div style={{ fontSize: 18, fontWeight: 500 }} className="mb-1">
            <i className="fa fa-inr" aria-hidden="true" /> {discountPrice} -{" "}
            <del style={{ color: "var(--bs-danger)", fontSize: 15 }}>
              {" "}
              <i className="fa fa-inr" aria-hidden="true" /> {PricePerPieces}
            </del>
          </div>
          {!expired && (
            <>
              <p style={{ color: "var(--bs-danger)" }}>
                <span>Hurry up ! offer ends in </span>
              </p>
              <div id="countdown">
                <Count deadliness={ValidTill} />
              </div>
            </>
          )}
          {expired && (
            <div className="expired_image">
              <img src="/images/expired.png" alt="expired" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StockPromotionItem;

import { Link } from "react-router-dom";

const VendorItem = ({ info }) => {
  let vendorTypeName = [];
  info?.vendorType?.split(",")?.map((item) => {
    switch (item) {
      case "1":
        vendorTypeName?.push("Exporter");
        break;
      case "2":
        vendorTypeName?.push("Importer");
        break;
      case "3":
        vendorTypeName?.push("Manufacturer");
        break;
      case "4":
        vendorTypeName?.push("Trader");
        break;
      case "5":
        vendorTypeName?.push("Distributor");
        break;
      case "6":
        vendorTypeName?.push("Dealer");
        break;
      case "7":
        vendorTypeName?.push("Retailer");
        break;
      case "8":
        vendorTypeName?.push("Service Provider");
        break;
      case "9":
        vendorTypeName?.push("Wholesaler");
        break;
      case "10":
        vendorTypeName?.push("Reseller");
        break;

      default:
        break;
    }
  });

  return (
    <>
      <div className="vendor__item">
        <div className="vendor__image">
          <img src={info?.ProfileImage} alt={info?.companyname} />
          <div className="vendor__badge">
            {(() => {
              switch (info?.packageType) {
                case "1":
                  return "basic";
                case "2":
                  return "Silver";

                default:
                  return "gold";
              }
            })()}
          </div>
        </div>
        <div className="vendor__content">
          <h5 className="title">{info?.companyname}</h5>
          <p className="text-capitalize">
            <strong>Address:</strong> {info?.Address}
            <span>
              {!info?.Address &&
                `${info?.City} ${info?.country?.toLowerCase()}`}
            </span>
          </p>
          {info?.vendorType && (
            <p>
              <strong>Vendor Type:</strong>{" "}
              {vendorTypeName?.map((item, i, arr) => (
                // <span key={i}>{i + 1 === arr.length ? item : `${item}, `}</span>
                <span key={i} className="vendor__type">
                  {item}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="vendor__action">
          <Link to={"/"} className="custom__btn">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default VendorItem;

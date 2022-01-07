const ProfileDetails = ({ info }) => {
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
      <table className="table table-striped table-bordered view__profile">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{info?.FullName}</td>
          </tr>
          {info?.companyname && (
            <tr>
              <td>company name</td>
              <td>{info?.companyname}</td>
            </tr>
          )}
          <tr>
            <td>Email ID</td>
            <td>{info?.Email}</td>
          </tr>
          <tr>
            <td>Mobile</td>
            <td>{info?.Mobile}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{info?.Address}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{info?.City}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{info?.State}</td>
          </tr>
          {info?.vendorType && (
            <tr>
              <td>Vendor Type</td>
              <td>
                {vendorTypeName?.map((item, i, arr) => (
                  <span key={i}>
                    {i + 1 === arr.length ? item : `${item}, `}
                  </span>
                ))}
              </td>
            </tr>
          )}
          <tr>
            <td>Valid UPTO</td>
            <td>{info?.ValidTill}</td>
          </tr>
          <tr>
            <td>Referral Code</td>
            <td>{info?.Refferal_code ? info?.Refferal_code : "N/A"}</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>
              <span
                className="bg-primary text-white px-3 d-inline-block"
                style={{ fontSize: 20, borderRadius: 4 }}
              >
                {info?.points ? info?.points : 0}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProfileDetails;

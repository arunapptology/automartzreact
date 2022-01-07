const VendorAbout = ({ vendorInfo }) => {
  return (
    <>
      <h5 className="d-flex align-items-center mb-3">
        <span>ABOUT {vendorInfo?.companyname} </span>
      </h5>
      <p
        dangerouslySetInnerHTML={{
          __html: vendorInfo?.vendor_aboutus && vendorInfo?.vendor_aboutus,
        }}
      />
      <b>Deals In : - </b>

      <p
        dangerouslySetInnerHTML={{
          __html: vendorInfo?.dealsIn && vendorInfo?.dealsIn,
        }}
      ></p>
    </>
  );
};

export default VendorAbout;

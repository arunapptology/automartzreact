import LightGallery from "lightgallery/react";

const VendorGallery = ({ vendorImages }) => {
  const onBeforeSlide = (detail) => {
    const { index, prevIndex } = detail;
  };
  return (
    <>
      <h5 className="d-flex align-items-center mb-3">PRODUCT GALLERY</h5>

      <div className="card h-100">
        <div className="card-body">
          <LightGallery
            elementClassNames="custom-wrapper-class"
            onBeforeSlide={onBeforeSlide}
          >
            <div className="gallery-box">
              <ul>
                {vendorImages?.map((item, key) => (
                  <li key={key}>
                    {" "}
                    <a
                      href={`https://www.automartz.com/uploads/vendor/${item}`}
                    >
                      <img
                        alt={`https://www.automartz.com/uploads/vendor/${item}`}
                        src={`https://www.automartz.com/uploads/vendor/${item}`}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </LightGallery>
        </div>
      </div>
    </>
  );
};

export default VendorGallery;

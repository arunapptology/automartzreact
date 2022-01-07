import { useState } from "react";

const StockPromotionGallery = ({ item }) => {
  const [activeImage, setActiveImage] = useState(item?.ProductImage);

  return (
    <>
      <div className="stock__promotion__gallery ">
        <div className="image ">
          <img
            src={`${item?.imagePath}${activeImage}`}
            alt=""
            className="w-100 "
          />
        </div>
        <div className="thumbs mt-2">
          <div className="row">
            <div className="col-md-4">
              <div className="thumbnail">
                <img src={`${item?.imagePath}${activeImage}`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockPromotionGallery;

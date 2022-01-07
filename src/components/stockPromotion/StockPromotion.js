import qs from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useGetStockPrmotionDetailMutation } from "../../services/productsApi";
import StockPromotionContent from "./StockPromotionContent";
import StockPromotionGallery from "./StockPromotionGallery";
import Loader from "../loader";
import StockDescription from "./StockDescription";
import StockSidebar from "./stockSidebar";
import AskPriceModal from "../ui/AskPriceModal";
import RelatedStocks from "./RelatedStocks";

const StockPromotion = () => {
  const location = useLocation();
  const params = qs.parse(location.search);

  const [fetchData, { data: stockDetailData, isLoading }] =
    useGetStockPrmotionDetailMutation();

  useEffect(() => {
    const formData = new FormData();
    formData?.append("stockid", params?.stockid);
    formData?.append("category", params?.category);
    formData?.append("user_role", params?.user);
    fetchData(formData);
  }, [params?.stockid, params?.category, params?.user]);

  return (
    <>
      <div className="stock__promotion__page py-5">
        <div className="container">
          {isLoading && <Loader />}
          {stockDetailData?.status === 1 && stockDetailData?.stock?.length > 0 && (
            <>
              <div className="row">
                <div className="col-md-9">
                  <div className="main__content">
                    <div className="row">
                      <div className="col-md-6">
                        <StockPromotionGallery
                          item={stockDetailData?.stock[0]}
                        />
                      </div>
                      <div className="col-md-6">
                        <StockPromotionContent
                          item={stockDetailData?.stock[0]}
                        />
                      </div>
                    </div>
                    <div className="description content__card mt-4">
                      <StockDescription item={stockDetailData?.stock[0]} />
                    </div>
                    <div className="related__stocks mt-4">
                      <RelatedStocks />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <StockSidebar item={stockDetailData?.stock[0]} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="askPriceModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
      >
        <AskPriceModal title="Get The Top Vendors" />
      </div>
    </>
  );
};

export default StockPromotion;

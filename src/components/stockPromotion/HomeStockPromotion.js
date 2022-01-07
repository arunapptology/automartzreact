import React, { useState, useEffect } from "react";

import StockPromotionItem from "./StockPromotionItem";
import CustomCarousel from "../ui/CustomCarousel";

import { useGetStockPromotionQuery } from "../../services/productsApi";
import TopHeading from "../ui/TopHeading";

import "./StockPromotion.css";
import NoDataFound from "../utils/NoDataFound";

function HomeStockPromotion() {
  const { data, isFetching, isLoading } = useGetStockPromotionQuery();

  const [allstock, setAllStock] = useState([]);
  const [basicStock, setBasicStock] = useState([]);
  const [silverStock, setSilverStock] = useState([]);
  const [goldStock, setGoldStock] = useState([]);

  useEffect(() => {
    if (!isFetching) {
      if (data?.status === 1) {
        setAllStock(data?.getvanstockinfoData);
        setBasicStock(
          data?.getvanstockinfoData?.filter((item) => item?.pack === "1")
        );
        setSilverStock(
          data?.getvanstockinfoData?.filter((item) => item?.pack === "2")
        );
        setGoldStock(
          data?.getvanstockinfoData?.filter((item) => item?.pack === "3")
        );
      }
    }
  }, [isFetching, data]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };

  return (
    <>
      <div className="stock-promotion">
        <TopHeading title="STOCK PROMOTION" subtitle="promotion" />
        {/*  stock */}

        <div className="stock-pro-content">
          <div className="row">
            <div className="col-sm-12 col-xl-2 mb-3 mb-xl-0">
              <ul className="nav nav-tabs nav-fill" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#all_d"
                    role="tab"
                    aria-controls="all"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="tab"
                    href="#gold_d"
                    role="tab"
                    aria-controls="gold"
                    aria-selected="false"
                  >
                    GOLD
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#silver_d"
                    role="tab"
                    aria-controls="silver"
                    aria-selected="false"
                  >
                    SILVER
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link "
                    data-toggle="tab"
                    href="#basic_d"
                    role="tab"
                    aria-controls="basic"
                    aria-selected="false"
                  >
                    BASIC
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-sm-12 col-xl-10">
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="all_d"
                  role="tabpanel"
                  aria-labelledby="all-tab"
                >
                  {!isLoading && (
                    <>
                      {allstock?.length > 0 ? (
                        <CustomCarousel settings={settings}>
                          {allstock?.map((item, i) => (
                            <StockPromotionItem key={i} {...item} />
                          ))}
                        </CustomCarousel>
                      ) : (
                        <NoDataFound
                          title={"No Stock Found"}
                          subtitle={"Currently No stock found"}
                        />
                      )}
                    </>
                  )}

                  {isLoading && (
                    <img
                      src="/images/stock_promotion_custom_view.gif"
                      alt="Custom View"
                    />
                  )}
                </div>

                <div
                  className="tab-pane"
                  id="gold_d"
                  role="tabpanel"
                  aria-labelledby="gold-tab"
                >
                  {!isLoading && (
                    <>
                      {goldStock?.length > 0 ? (
                        <CustomCarousel settings={settings}>
                          {goldStock?.map((item, i) => (
                            <StockPromotionItem key={i} {...item} />
                          ))}
                        </CustomCarousel>
                      ) : (
                        <NoDataFound
                          title={"No Stock Found"}
                          subtitle={"Currently No stock found"}
                        />
                      )}
                    </>
                  )}

                  {isLoading && (
                    <img
                      src="/images/stock_promotion_custom_view.gif"
                      alt="Custom View"
                    />
                  )}
                </div>

                <div
                  className="tab-pane"
                  id="silver_d"
                  role="tabpanel"
                  aria-labelledby="silver-tab"
                >
                  {!isLoading && (
                    <>
                      {silverStock?.length > 0 ? (
                        <CustomCarousel settings={settings}>
                          {silverStock?.map((item, i) => (
                            <StockPromotionItem key={i} {...item} />
                          ))}
                        </CustomCarousel>
                      ) : (
                        <NoDataFound
                          title={"No Stock Found"}
                          subtitle={"Currently No stock found"}
                        />
                      )}
                    </>
                  )}

                  {isLoading && (
                    <img
                      src="/images/stock_promotion_custom_view.gif"
                      alt="Custom View"
                    />
                  )}
                </div>

                <div
                  className="tab-pane"
                  id="basic_d"
                  role="tabpanel"
                  aria-labelledby="basic-tab"
                >
                  {!isLoading && (
                    <>
                      {basicStock?.length > 0 ? (
                        <CustomCarousel settings={settings}>
                          {basicStock?.map((item, i) => (
                            <StockPromotionItem key={i} {...item} />
                          ))}
                        </CustomCarousel>
                      ) : (
                        <NoDataFound
                          title={"No Stock Found"}
                          subtitle={"Currently No stock found"}
                        />
                      )}
                    </>
                  )}

                  {isLoading && (
                    <img
                      src="/images/stock_promotion_custom_view.gif"
                      alt="Custom View"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* stock end */}
      </div>
    </>
  );
}
export default HomeStockPromotion;

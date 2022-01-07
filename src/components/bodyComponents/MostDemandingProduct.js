import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetMostVisitedProductsQuery } from "../../services/productsApi";
import { navProductDetails } from "../navbar/navigationSlugs";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function MostDemandingProduct() {
  const { data: mdpData, isLoading } = useGetMostVisitedProductsQuery();

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4,
        },
      },
    ],
  };

  return (
    <>
      <div className="most-demanding-pro-main">
        <TopHeading title={"MOST DEMANDING PRODUCTS"} subtitle={"demanding"} />

        <div className="most-demanding-pro">
          <div className="bg-transprant">
            <div className="bg-products">
              <CustomCarousel settings={settings}>
                {!isLoading &&
                  mdpData?.status === 1 &&
                  mdpData?.mostDemandingPro?.length > 0 &&
                  mdpData?.mostDemandingPro?.map(
                    (item) =>
                      item?.ProductName && (
                        <Link
                          to={`${navProductDetails}/${item?.ProductId}/${item?.CategoryId}`}
                          key={item?.Id}
                          className="item"
                        >
                          <img
                            className="img"
                            src={item?.img_status && item?.img_path}
                            alt={item?.ProductName}
                          />
                          <div className="item-content-2">
                            <p>{item?.ProductName}</p>
                          </div>
                        </Link>
                      )
                  )}
                {isLoading && <img src="/images/CustomView.gif" />}
              </CustomCarousel>
            </div>
            <div className="banner-text pt-5">
              <p>
                You can see above some of the products which are mostly demanded{" "}
                <br />
                by the consumers on AutoMartz in the last year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MostDemandingProduct;

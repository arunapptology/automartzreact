import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useGetMostVisitedVendorsQuery } from "../../services/vendorApi";
import { navVendorDetails } from "../navbar/navigationSlugs";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function MostViewedvendor() {
  const { data: mvvData } = useGetMostVisitedVendorsQuery();

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
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
      <div className="most-view-vendor">
        <TopHeading title={"MOST VIEWED VENDOR"} subtitle={"most viewed"} />

        <CustomCarousel settings={settings}>
          {mvvData?.mostVisitVan_data ? (
            mvvData?.mostVisitVan_data &&
            mvvData?.mostVisitVan_data?.map((mvvDatas, i) => (
              <div key={i}>
                <Link
                  className="item"
                  to={`${navVendorDetails}/vendor/${mvvDatas.UserSlug}`}
                >
                  <img
                    className="img"
                    src={
                      mvvDatas.ProfileImage.length > 45
                        ? mvvDatas.ProfileImage
                        : "https://www.automartz.com/uploads/products/coming-soon.jpg"
                    }
                  />
                </Link>

                <div className="item-content">
                  <Link to={`${navVendorDetails}/vendor/${mvvDatas.UserSlug}`}>
                    {" "}
                    <p>{mvvDatas.companyname}</p>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <img src="/images/CustomView.gif" />
          )}
        </CustomCarousel>
      </div>
    </>
  );
}
export default MostViewedvendor;

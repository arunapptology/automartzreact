import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetLatestVendorsQuery } from "../../services/vendorApi";
import { navVendorDetails } from "../navbar/navigationSlugs";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function LatestVendor() {
  const { data } = useGetLatestVendorsQuery();

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
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
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="latest-vendor shadow">
        <TopHeading
          title={"Latest Vendor"}
          subtitle={"Latest"}
          className={"text-center small"}
        />

        <div className="new-register-ven">
          <CustomCarousel settings={settings}>
            {data?.status === 1 &&
              data?.latestvendors?.length > 0 &&
              data?.latestvendors?.map((item) => (
                <Link
                  className="item"
                  style={{ background: "var(--bs-gray-100)" }}
                  key={item?.Id}
                  to={`${navVendorDetails}/vendor/${item?.UserSlug}`}
                >
                  <img className="img" src={item?.ProfileImage} />

                  <div className="text-center">
                    <p>{item?.companyname}</p>
                  </div>
                </Link>
              ))}
          </CustomCarousel>
        </div>
      </div>
    </>
  );
}
export default LatestVendor;

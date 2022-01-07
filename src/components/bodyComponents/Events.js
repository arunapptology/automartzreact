import React, { useState, useEffect } from "react";
import {
  useGetInternationalEventsQuery,
  useGetNationalEventsQuery,
} from "../../services/newsApi";
import InternationalEventItem from "../blogComponents/events/InternationalEventItem";
import NationalEventItem from "../blogComponents/events/NationalEventItem";
import EventItem from "../blogComponents/events/NationalEventItem";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function Events() {
  const { data: nationalData, isLoading: isNataionalDataLoading } =
    useGetNationalEventsQuery();

  const { data: internationalData, isLoading: isInternataionalDataLoading } =
    useGetInternationalEventsQuery();

  const settings = {
    slidesToShow: 2,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 480,
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
    ],
  };

  return (
    <>
      <div className="event-section-box">
        <TopHeading title={"events"} subtitle={"events"} />

        <div className="event-post-content trending__content">
          <ul
            className="nav nav-tabs nav-fill align-items-center"
            role="tablist"
          >
            <li className="nav-">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#national"
                role="tab"
                aria-controls="national"
                aria-selected="true"
              >
                NATIONAL
              </a>
            </li>
            <li className="nav-">
              <a
                className="nav-link "
                data-toggle="tab"
                href="#international"
                role="tab"
                aria-controls="international"
                aria-selected="false"
              >
                INTERNATIONAL
              </a>
            </li>
            <li className="view-more">
              <a href="">VIEW MORE</a>
            </li>
          </ul>
          <div className="tab-content mt-3">
            <div
              className="tab-pane active"
              id="national"
              role="tabpanel"
              aria-labelledby="national"
            >
              <CustomCarousel settings={settings}>
                {isNataionalDataLoading && (
                  <img
                    src="/images/news_trends_custom_view.gif"
                    alt="custom view"
                  />
                )}

                {!isNataionalDataLoading &&
                  nationalData?.status === 1 &&
                  nationalData?.national_launches?.length > 0 &&
                  nationalData?.national_launches?.map((item) => (
                    <NationalEventItem key={item?.Id} item={item} />
                  ))}
              </CustomCarousel>
            </div>
            <div
              className="tab-pane "
              id="international"
              role="tabpanel"
              aria-labelledby="international"
            >
              <CustomCarousel settings={settings}>
                {isInternataionalDataLoading && (
                  <img
                    src="/images/news_trends_custom_view.gif"
                    alt="custom view"
                  />
                )}

                {!isInternataionalDataLoading &&
                  internationalData?.status === 1 &&
                  internationalData?.international_launches?.length > 0 &&
                  internationalData?.international_launches?.map((item) => (
                    <InternationalEventItem key={item?.Id} item={item} />
                  ))}
              </CustomCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Events;

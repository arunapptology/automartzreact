import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetInternationalEventsDetailsQuery,
  useGetLatestLaunchesDetailsQuery,
  useGetLatestNewsDetailsQuery,
  useGetNationalEventsDetailsQuery,
} from "../../services/newsApi";

import DetailBanner from "./DetailBanner";
import LaunchDetailsContent from "./news/LaunchDetailsContent";
import NewsDetailsContent from "./news/NewsDetailsContent";
import TrendingDetailsSidebar from "./TrendingDetailsSidebar";

import "../blogComponents/blog.css";
import EventDetailsContent from "./events/EventDetailsContent";

function TrandingDetails() {
  const params = useParams();

  const [detailedItems, setDetailedItems] = useState();

  const { data: newsData, isLoading: isNewsLoading } =
    useGetLatestNewsDetailsQuery(params?.name);

  const { data: LaunchesData, isLoading: isLaunchesLoading } =
    useGetLatestLaunchesDetailsQuery(params?.name);

  const {
    data: nationalData,
    isLoading: isNationalLoading,
    error,
  } = useGetNationalEventsDetailsQuery(params?.name);

  const { data: internationalData, isLoading: isInternationalLoading } =
    useGetInternationalEventsDetailsQuery(params?.name);

  useEffect(() => {
    if (params?.id === "latest-news") {
      if (newsData?.status === 1 && newsData?.latest_news_id?.length > 0) {
        setDetailedItems(newsData?.latest_news_id[0]);
      }
    }
    if (params?.id === "latest-launches") {
      if (
        LaunchesData?.status === 1 &&
        LaunchesData?.latest_news_id?.length > 0
      ) {
        setDetailedItems(LaunchesData?.latest_news_id[0]);
      }
    }
    if (params?.id === "national-events") {
      if (
        nationalData?.status === 1 &&
        nationalData?.data?.natevent?.length > 0
      ) {
        setDetailedItems(nationalData?.data?.natevent[0]);
      }
    }
    if (params?.id === "international-events") {
      if (
        internationalData?.status === 1 &&
        internationalData?.data?.intevent?.length > 0
      ) {
        setDetailedItems(internationalData?.data?.intevent[0]);
      }
    }
  }, [newsData, LaunchesData, nationalData, internationalData, params?.name]);

  console.log(detailedItems);

  return (
    <>
      <section className="news-detail-sec">
        <DetailBanner />
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8 news-post-content news-details">
              {(isNewsLoading || isLaunchesLoading) && (
                <img
                  src="/images/post_details_custom_view.gif"
                  alt="custom view"
                />
              )}
              {params?.id === "latest-news" && (
                <>
                  <NewsDetailsContent item={detailedItems} />
                </>
              )}
              {params?.id === "latest-launches" && (
                <LaunchDetailsContent item={detailedItems} />
              )}
              {params?.id === "national-events" && (
                <>
                  <EventDetailsContent item={detailedItems} />
                </>
              )}
              {params?.id === "international-events" && (
                <>
                  <EventDetailsContent item={detailedItems} />
                </>
              )}
            </div>

            <div className="col-lg-4">
              <TrendingDetailsSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default TrandingDetails;

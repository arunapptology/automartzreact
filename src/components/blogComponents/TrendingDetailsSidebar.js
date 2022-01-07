import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useGetInternationalEventsQuery,
  useGetLatestLaunchesQuery,
  useGetLatestNewsQuery,
  useGetNationalEventsQuery,
} from "../../services/newsApi";
import { navTrendingDetails } from "../navbar/navigationSlugs";

const TrendingDetailsSidebar = () => {
  const params = useParams();

  const [latestItems, setLatestItems] = useState();

  const { data: latestNews, isLoading: isNewsLoading } =
    useGetLatestNewsQuery();
  const { data: latestLaunches, isLoading: isLaunchesLoading } =
    useGetLatestLaunchesQuery();
  const { data: nationalData, isLoading: isNataionalDataLoading } =
    useGetNationalEventsQuery();

  const { data: internationalData, isLoading: isInternataionalDataLoading } =
    useGetInternationalEventsQuery();

  useEffect(() => {
    if (params?.id === "latest-news") {
      if (latestNews?.status === 1 && latestNews?.latest_news?.length > 0) {
        setLatestItems(latestNews?.latest_news);
      }
    }
    if (params?.id === "latest-launches") {
      if (
        latestLaunches?.status === 1 &&
        latestLaunches?.latest_launches?.length > 0
      ) {
        setLatestItems(latestLaunches?.latest_launches);
      }
    }
    if (params?.id === "national-events") {
      if (
        nationalData?.status === 1 &&
        nationalData?.national_launches?.length > 0
      ) {
        setLatestItems(nationalData?.national_launches);
      }
    }
    if (params?.id === "international-events") {
      if (
        internationalData?.status === 1 &&
        internationalData?.international_launches?.length > 0
      ) {
        setLatestItems(internationalData?.international_launches);
      }
    }
  }, [latestNews, latestLaunches, nationalData, internationalData]);

  return (
    <>
      <aside className="details__sidebar">
        <div className="widget">
          <h6 className="mb-4">LATEST POST</h6>

          {(isNewsLoading || isLaunchesLoading) && (
            <img
              src="/images/CustomView.gif"
              className="w-100"
              alt="custom views"
            />
          )}

          {latestItems?.length > 0 &&
            latestItems?.slice(0, 5)?.map((item) => (
              <div className="media" key={item?.Id}>
                {params?.id === "latest-news" && (
                  <>
                    <Link
                      to={`${navTrendingDetails}/latest-news/${item?.slug}`}
                    >
                      <div className="post-thumb-sm mr-3">
                        <img
                          className="img"
                          src={`${process.env.REACT_APP_API_URL}/${item.imagepath}/${item.image_name}`}
                        />
                      </div>
                    </Link>
                    <div className="media-body">
                      <h6>
                        <Link
                          to={`${navTrendingDetails}/latest-news/${item?.slug}`}
                        >
                          {item.title}
                        </Link>
                      </h6>
                    </div>
                  </>
                )}

                {params?.id === "latest-launches" && (
                  <>
                    <Link
                      to={`${navTrendingDetails}/latest-launches/${item?.title
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")}`}
                    >
                      <div className="post-thumb-sm mr-3">
                        <img className="img" src={item?.image} />
                      </div>
                    </Link>
                    <div className="media-body">
                      <h6>
                        <Link
                          to={`${navTrendingDetails}/latest-launches/${item?.title
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                        >
                          {item.title}
                        </Link>
                      </h6>
                    </div>
                  </>
                )}

                {params?.id === "national-events" && (
                  <>
                    <Link
                      to={`${navTrendingDetails}/national-events/${item?.title
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")}`}
                    >
                      <div className="post-thumb-sm mr-3">
                        <img
                          className="img"
                          src={item?.image}
                          alt={item?.title}
                        />
                      </div>
                    </Link>
                    <div className="media-body">
                      <h6>
                        <Link
                          to={`${navTrendingDetails}/national-events/${item?.title
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                        >
                          {item.title}
                        </Link>
                      </h6>
                    </div>
                  </>
                )}

                {params?.id === "international-events" && (
                  <>
                    <Link
                      to={`${navTrendingDetails}/international-events/${item?.title
                        .replace(/ /g, "-")
                        .replace(/[^\w-]+/g, "")}`}
                    >
                      <div className="post-thumb-sm mr-3">
                        <img
                          className="img"
                          src={item?.image}
                          alt={item?.title}
                        />
                      </div>
                    </Link>
                    <div className="media-body">
                      <h6>
                        <Link
                          to={`${navTrendingDetails}/international-events/${item?.title
                            .replace(/ /g, "-")
                            .replace(/[^\w-]+/g, "")}`}
                        >
                          {item.title}
                        </Link>
                      </h6>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>

        {/* <div className="widget">
          <h6> FOLLOW ME</h6>

          <div id="wrap">
            <a className="button twitter">
              <i className="fa fa-twitter"></i> Twitter
            </a>

            <a className="button facebook">
              <i className="fa fa-facebook"></i> Facebook
            </a>

            <a className="button pinterest">
              <i className="fa fa-pinterest"></i> Pinterest
            </a>

            <a className="button google-plus">
              <i className="fa fa-google-plus"></i> Google
            </a>
          </div>
        </div> */}

        {/* <div className="widget">
          <div id="fb-root"></div>
          <div
            className="fb-post"
            data-href="https://www.facebook.com/20531316728/posts/10154009990506729/"
            data-width="500"
          ></div>
        </div> */}
        {/* 
        <div className="widget">
          <h6 className="mb-4">CATEGORIES</h6>
          <ul className="list-inline tag-list">
            <li className="list-inline-item m-1"><a href="blog-single.html">ui ux</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">developmetns</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">travel</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">article</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">travel</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">ui ux</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">article</a></li>
            <li className="list-inline-item m-1"><a href="blog-single.html">developmetns</a></li>
          </ul>
        </div> */}

        {/* <div id="instafeed-tutorial"></div> */}
      </aside>
    </>
  );
};

export default TrendingDetailsSidebar;

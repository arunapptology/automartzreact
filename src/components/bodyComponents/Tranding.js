import { Link } from "react-router-dom";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";
import {
  useGetLatestLaunchesQuery,
  useGetLatestNewsQuery,
} from "../../services/newsApi";

import LatestLaunchesItem from "../blogComponents/news/LatestLaunchesItem";
import LatestNewsItem from "../blogComponents/news/LatestNewsItem";
import { navNewsList } from "../navbar/navigationSlugs";

function Tranding() {
  const { data: latestNews, isLoading: isLatestNewsLoading } =
    useGetLatestNewsQuery();
  const { data: latestLaunches, isLoading: isLatestLaunchesLoading } =
    useGetLatestLaunchesQuery();

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
      <div className="news-section-box">
        <TopHeading title={"trending now"} subtitle={"trending"} />

        <div className="news-post-content trending__content">
          <ul
            className="nav nav-tabs nav-fill align-items-center"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#news"
                role="tab"
                aria-controls="news"
                aria-selected="true"
              >
                NEWS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-toggle="tab"
                href="#launch"
                role="tab"
                aria-controls="launch"
                aria-selected="false"
              >
                LAUNCHES
              </a>
            </li>

            <li className="view-more">
              <Link to={navNewsList}>VIEW MORE</Link>
            </li>
          </ul>

          <div className="tab-content mt-3">
            <div
              className="tab-pane active"
              id="news"
              role="tabpanel"
              aria-labelledby="news-tab"
            >
              <CustomCarousel settings={settings}>
                {!isLatestNewsLoading &&
                  latestNews?.status === 1 &&
                  latestNews.latest_news?.length > 0 &&
                  latestNews.latest_news.map((item) => (
                    <LatestNewsItem key={item?.Id} item={item} />
                  ))}
                {isLatestNewsLoading && (
                  <img
                    src="/images/news_trends_custom_view.gif"
                    alt="custom view"
                  />
                )}
              </CustomCarousel>
            </div>

            <div
              className="tab-pane"
              id="launch"
              role="tabpanel"
              aria-labelledby="launch-tab"
            >
              <CustomCarousel settings={settings}>
                {!isLatestLaunchesLoading &&
                  latestLaunches?.status === 1 &&
                  latestLaunches?.latest_launches?.length > 0 &&
                  latestLaunches?.latest_launches?.map((item) => (
                    <LatestLaunchesItem key={item?.Id} item={item} />
                  ))}
                {isLatestLaunchesLoading && (
                  <img
                    src="/images/news_trends_custom_view.gif"
                    alt="custom view"
                  />
                )}
              </CustomCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tranding;

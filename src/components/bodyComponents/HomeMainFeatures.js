import { Link } from "react-router-dom";
import {
  navComingSoon,
  navCommunity,
  navLaunchesList,
  navNewsList,
} from "../navbar/navigationSlugs";

const HomeMainFeatures = () => {
  return (
    <>
      <section>
        <div className="our-features-main">
          <ul>
            <li>
              {" "}
              <Link to={navCommunity} className="">
                <img src="/icons/community-icon.png" alt="community" />
                <p>community </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navComingSoon} className="">
                <img src="../icons/concluded-events-icon.png" alt="event" />
                <p>Concluded Events </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navComingSoon} className="">
                <img src="../icons/upcoming-events-icon.png" alt="event" />
                <p>Upcoming Events </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navComingSoon} className="">
                <img src="../icons/sale-stock-icon.png" alt="stock" />
                <p>Sale Stock </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navNewsList}>
                <img src="../icons/latest-news-icon.png" alt="news" />
                <p>Latest News </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navLaunchesList}>
                <img src="../icons/latest-launches-icon.png" alt="latest" />
                <p>Latest Launches </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navComingSoon} className="">
                <img src="../icons/do-u-know-icon.png" alt="know" />
                <p>Do You Know </p>
              </Link>
            </li>
            <li>
              {" "}
              <Link to={navComingSoon} className="">
                <img src="../icons/post-ouyr-req-icon.png" alt="post" />
                <p>Post Your Requirements </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default HomeMainFeatures;

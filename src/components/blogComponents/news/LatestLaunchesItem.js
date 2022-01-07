import { Link } from "react-router-dom";
import { navTrendingDetails } from "../../navbar/navigationSlugs";

const LatestLaunchesItem = ({ item }) => {
  const regex = /(<([^>]+)>)/gi;
  return (
    <>
      <div className="item">
        <Link
          to={`${navTrendingDetails}/latest-launches/${item?.title
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
        >
          <img className="img" src={item?.image} alt={item.title} />
        </Link>
        <div className="item-content">
          <Link
            to={`${navTrendingDetails}/latest-launches/${item?.title
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "")}`}
            className="title"
          >
            <span
              dangerouslySetInnerHTML={{
                __html:
                  item?.title &&
                  item?.title.replace(regex, "").substring(0, 40),
              }}
            />
            {item?.title?.length > 40 && "..."}
          </Link>
          <p className="py-3">
            {" "}
            <small
              dangerouslySetInnerHTML={{
                __html:
                  item?.des && item?.des.replace(regex, "").substring(0, 160),
              }}
            />
            ...
          </p>
          {/* <hr /> */}
          <div className="social-shearing-tabs mt-0">
            <ul>
              {/* <li>
                <a>
                  {" "}
                  <i className="fa fa-heart-o" aria-hidden="true">
                    {" "}
                  </i>{" "}
                  Like <span>{item?.likes}</span>
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="">
                  <i className="fa fa-share" aria-hidden="true"></i> Share{" "}
                </a>
              </li> */}
              <li className="text-left">
                {" "}
                <Link
                  to={`${navTrendingDetails}/latest-launches/${item?.title
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "")}`}
                >
                  Read More
                  <i className="fa fa-angle-right ml-2" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestLaunchesItem;

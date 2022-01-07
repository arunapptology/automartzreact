import { Link } from "react-router-dom";
import { useGetLatestNewsQuery } from "../../../services/newsApi";
import { navTrendingDetails } from "../../navbar/navigationSlugs";

function NewsList() {
  const regex = /(<([^>]+)>)/gi;

  const { data: latestNews, isLoading } = useGetLatestNewsQuery();

  return (
    <>
      <section className="blog-listing gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {!isLoading &&
                  latestNews?.latest_news &&
                  latestNews?.latest_news.map((item) => (
                    <div className="col-sm-6 mb-4" key={item?.Id}>
                      <div className="blog-grid h-100">
                        <div className="blog-img">
                          {/* <div className="date">
                            <span>04</span>
                            <label>FEB</label>
                          </div> */}
                          <Link
                            to={`${navTrendingDetails}/latest-news/${item.slug}`}
                          >
                            <img
                              className="img"
                              src={`${process.env.REACT_APP_API_URL}/${item?.imagepath}/${item.image_name}`}
                            />
                          </Link>
                        </div>

                        <div className="blog-info">
                          <Link
                            to={`${navTrendingDetails}/latest-news/${item.slug}`}
                            className="title"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.title,
                              }}
                            />
                          </Link>
                          <p>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item?.description
                                  .replace(regex, "")
                                  .substring(0, 180),
                              }}
                            />
                            {item?.description?.length > 180 && "..."}
                          </p>
                          <div className="btn-bar">
                            <Link
                              to={`${navTrendingDetails}/latest-news/${item?.slug}`}
                            >
                              Read More
                              <i
                                className="fa fa-angle-right ml-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {isLoading && <img src="/images/CustomView.gif" />}
              </div>
            </div>

            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget">
                <div className="widget-body">
                  <a
                    href="https://play.google.com/store/apps/details?id=app.aspi"
                    target="_blank"
                    className="d-block border"
                  >
                    <img
                      src="/images/download-the-app.jpg"
                      alt="download the app"
                      className="w-100"
                    />
                  </a>
                </div>
              </div>
              <div className="widget">
                <div className="widget-body">
                  <img
                    src="/images/do_you_know_auto_rikshaw.jpg"
                    alt="download the app"
                    className="w-100 border"
                  />
                </div>
              </div>
              <div className="widget">
                <div className="widget-body">
                  <img
                    src="/images/Do_you_know_truck.jpg"
                    alt="download the app"
                    className="w-100 border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default NewsList;

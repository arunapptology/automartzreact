import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import "../blog.css";

function LaunchesList() {
  const [latestNews, setlatestNews] = useState([]);

  const regex = /(<([^>]+)>)/gi;

  useEffect(() => {
    fetch(`https://www.automartz.com/api-web/Api/autotendsnews`, {
      method: "get",
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.status == 1) {
          setlatestNews(resp);
        } else {
          setlatestNews(resp);
        }
      });
    });
  }, []);

  return (
    <>
      <section class="blog-listing gray-bg">
        <div class="container">
          <div class="row align-items-start">
            <div class="col-lg-8 m-15px-tb">
              <div class="row">
                {latestNews.latest_launches ? (
                  latestNews.latest_launches &&
                  latestNews.latest_launches.map((latest_news, key) => (
                    <div class="col-sm-6">
                      <div class="blog-grid">
                        <div class="blog-img">
                          <div class="date">
                            <span>04</span>
                            <label>FEB</label>
                          </div>
                          <Link
                            to={`/tranding-details/latest-launches/${latest_news.title
                              .replace(/ /g, "-")
                              .replace(/[^\w-]+/g, "")}`}
                          >
                            <img className="img" src={latest_news.image} />
                          </Link>
                        </div>

                        <div class="blog-info">
                          <Link
                            to={`/tranding-details/latest-launches/${latest_news.title
                              .replace(/ /g, "-")
                              .replace(/[^\w-]+/g, "")}`}
                          >
                            <h5
                              dangerouslySetInnerHTML={{
                                __html:
                                  latest_news.title &&
                                  latest_news.title
                                    .replace(regex, "")
                                    .substring(0, 55),
                              }}
                            />
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  latest_news.des &&
                                  latest_news.des
                                    .replace(regex, "")
                                    .substring(0, 180),
                              }}
                            />
                          </Link>

                          <div class="btn-bar">
                            <a href="#" class="px-btn-arrow">
                              <span>Read More</span>
                              <i class="arrow"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <img src="https://www.syncfusion.com/blogs/wp-content/uploads/2019/10/CustomView.gif" />
                )}

                <div class="col-12">
                  <ul class="pagination justify-content-center">
                    <li class="page-item disabled">
                      <a class="page-link" href="#" tabindex="-1">
                        <i class="fas fa-chevron-left"></i>
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">
                        2 <span class="sr-only">(current)</span>
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        <i class="fas fa-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
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
export default LaunchesList;

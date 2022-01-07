import Count from "./components/Count";

import Survey from "./components/bodyComponents/Survey";

import MostDemandingProduct from "./components/bodyComponents/MostDemandingProduct";
import MostViewedvendor from "./components/bodyComponents/MostViewedvendor";
import Tranding from "./components/bodyComponents/Tranding";
import Events from "./components/bodyComponents/Events";
import Testimonials from "./components/bodyComponents/Testimonials";
import Faqs from "./components/bodyComponents/Faqs";
import LatestVendor from "./components/vendor/LatestVendor";

import TopHeading from "./components/ui/TopHeading";
import SearchByCategory from "./components/homePageSections/searchByCategory/SearchByCategory";
import BestDeals from "./components/homePageSections/BestDeals";
import HomeMainBanner from "./components/bodyComponents/HomeMainBanner";
import HomeMainFeatures from "./components/bodyComponents/HomeMainFeatures";
import HomeCommunitySection from "./components/community/HomeCommunitySection";
import HomeStockPromotion from "./components/stockPromotion/HomeStockPromotion";

function Body() {
  return (
    <>
      <div className="main-body">
        <div className="">
          <HomeMainBanner />
          <div className="container">
            <HomeMainFeatures />

            <section>
              <div className="main-box">
                <div className="pt-3">
                  <div className="row">
                    <div className="col-md-9 col-12">
                      <SearchByCategory />

                      <div className="pt-1">
                        <BestDeals />
                      </div>
                    </div>
                    <div className="col-md-3 col-12 pt-4 pt-md-0">
                      <HomeCommunitySection />
                    </div>
                  </div>
                </div>
                <div className="py-4 ">
                  <div className="row">
                    <div className="col-xl-9 col-12">
                      <HomeStockPromotion />
                    </div>
                    <div className="col-xl-3 col-12 pt-4 pt-md-0">
                      <div className="post-stock">
                        <TopHeading
                          title="post stock"
                          subtitle={"community"}
                          className={"text-center small"}
                        />

                        <div
                          className="post-stock-content"
                          style={{ borderRadius: 6, overflow: "hidden" }}
                        >
                          <div className="bg-transprant text-center">
                            <p className="mb-4">POST YOUR STOCK</p>

                            {/* <button className="btn btn-danger btn-sm ">
                              Post Now
                            </button> */}
                            <p style={{ fontSize: 14, fontWeight: 300 }}>
                              Add your old and not-in-use vehicle image here
                              with its basic details and sell it faster!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-5">
                  <MostDemandingProduct />
                </div>
                <div className="pb-5">
                  <div className="row">
                    <div className="col-md-9 col-12">
                      <MostViewedvendor />
                    </div>
                    <div className="col-md-3 col-12">
                      <LatestVendor />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* news-section start */}
          <div className="news-section">
            <div className=" container">
              <div className="row">
                <div className="col-lg-9 col-12">
                  <Tranding />
                </div>
                <div className="col-lg-3 col-12 pt-4 pt-lg-0">
                  <Survey />
                </div>
              </div>
            </div>
          </div>

          {/* event section  */}

          <div className="event-section pb-4 pt-4 pt-md-0">
            <div className=" container">
              <div className="row">
                <div className="col-md-9 col-12">
                  <Events />
                </div>
                <div className="col-md-3 col-12 pt-4 pt-md-0">
                  <div className="post-stock ">
                    <TopHeading
                      title={"upcoming events"}
                      subtitle={"upcoming"}
                      className={"text-center small"}
                    />
                    <div className="post-stock-content upcoming__event">
                      <div className="bg-transprant">
                        <div className="event-post-coment">
                          <p>Upcoming Events</p>
                          <p></p>
                          {/* <button className="btn btn-danger btn-sm ">Post Now</button> */}
                          <div id="countdown">
                            {/* <Count deadliness={"09-Jan-2022"} /> */}
                          </div>

                          {/* <ul className="event-show-more">
                            <li>
                              <button className="btn btn-custom">
                                View Details
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-custom">
                                View More
                              </button>
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* testimonial */}

          {/* <div className="testimonial-section ">
            <Testimonials />
          </div> */}

          <div
            className="faq py-4"
            style={{ backgroundColor: "var(--bs-gray-200)" }}
          >
            <Faqs />
          </div>
          {/*  */}
        </div>
        {/* end section */}
      </div>
    </>
  );
}
export default Body;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetSurveyQuery } from "../../services/globalApi";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function Survey() {
  const { data: surveyData } = useGetSurveyQuery();

  return (
    <>
      <TopHeading
        title={"survey"}
        subtitle={"our survey"}
        className={"text-center small"}
      />
      <div className="row">
        <div className="col-sm-6 col-lg-12">
          <div className="survey-main-box ">
            <CustomCarousel
              settings={{
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
              }}
            >
              {surveyData?.status === 1 &&
                surveyData?.survey_data?.length > 0 &&
                surveyData?.survey_data?.map((item, i) => (
                  <div
                    className="item-content survey-content shadow bg-white h-100 pt-xl-4 px-xl-4"
                    key={item?.Id}
                  >
                    <p>{item?.question}</p>
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name={`survey_${item?.Id}`}
                          id={`survey_${item?.Id}_${item?.option1}_${i}`}
                          value={item?.option1}
                        />
                        <label
                          htmlFor={`survey_${item?.Id}_${item?.option1}_${i}`}
                        >
                          {item?.option1}
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name={`survey_${item?.Id}`}
                          id={`survey_${item?.Id}_${item?.option2}_${i}`}
                          value={item?.option2}
                        />
                        <label
                          htmlFor={`survey_${item?.Id}_${item?.option2}_${i}`}
                        >
                          {item?.option2}
                        </label>
                      </li>
                    </ul>
                  </div>
                ))}
            </CustomCarousel>
          </div>
        </div>
        <div className="col-sm-6 col-lg-12 pt-5 pt-sm-0 pt-lg-3 pt-xl-4 ">
          <a
            className="app-download-box  shadow d-block"
            href="https://play.google.com/store/apps/details?id=app.aspi"
            target="_blank"
          >
            <div className="row">
              <div className="col-md-5 col-5">
                <img
                  src="/icons/app-download.png"
                  alt="Download App"
                  className="w-100"
                />
              </div>
              <div className="col-md-7 col-7">
                <h5>Download The Automaertz App</h5>
                <p>
                  Find Sellers Vehicles Spare Parts Accessories & All Services
                </p>
                <img
                  src="/images/android-icon.jpg"
                  alt="Download The Automaertz App"
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
export default Survey;

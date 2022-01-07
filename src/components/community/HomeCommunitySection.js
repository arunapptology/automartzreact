import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetCommunityQuestionShortListQuery } from "../../services/globalApi";
import { navCommunity } from "../navbar/navigationSlugs";
import TopHeading from "../ui/TopHeading";

function HomeCommunitySection() {
  const regex = /(<([^>]+)>)/gi;

  const { data: communityData, isLoading } =
    useGetCommunityQuestionShortListQuery();

  return (
    <>
      <div className="community">
        <TopHeading
          title="community"
          subtitle="community"
          className="text-center small"
        />

        <div className="community-content">
          <ul className="community__items">
            {!isLoading &&
              communityData?.status === 1 &&
              communityData?.QuestionList?.length > 0 &&
              communityData?.QuestionList.map((item, i) => (
                <li key={item?.Id}>
                  {" "}
                  <Link to={navCommunity}>
                    <span>{i + 1}. </span> {item.description}
                  </Link>
                  <div className="qoe-rep-sec">
                    <ul>
                      <li>
                        <Link to={navCommunity}>
                          <span>
                            {" "}
                            {item.Total_comments ? item.Total_comments : 0}{" "}
                          </span>{" "}
                          <i className="far fa-comment-alt"></i>{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to={navCommunity}>
                          {" "}
                          <i className="fas fa-reply-all"></i> Reply{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to={navCommunity}>
                          {" "}
                          <i
                            className="fa fa-clock-o"
                            aria-hidden="true"
                          ></i>{" "}
                          {item.CreatedOn}{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
          </ul>

          <Link
            to={navCommunity}
            className="btn btn-danger btn-block btn-all mt-3"
            style={{ fontSize: 16 }}
          >
            Read All
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeCommunitySection;

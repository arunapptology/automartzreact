import React, { useState, useEffect } from "react";
import { useGetFaqsQuery } from "../../services/globalApi";
import TopHeading from "../ui/TopHeading";

function Faqs() {
  const regex = /(<([^>]+)>)/gi;

  const { data: faqsData } = useGetFaqsQuery();

  return (
    <>
      <div className="container faq-section-box">
        <div className="row">
          <div className="col-md-12">
            <TopHeading title={"FAQ's"} subtitle={"FAQ's"} />

            <div
              className="panel-group"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              {faqsData?.faqs_data &&
                faqsData?.faqs_data.map((item, i) => (
                  <div className="panel panel-default" key={i}>
                    <div
                      className="panel-heading"
                      role="tab"
                      id={"headingTwo_" + i}
                    >
                      <h4 className="panel-title">
                        <a
                          className="collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href={"#collapseTwo_" + i}
                          aria-expanded="false"
                          aria-controls={"collapseTwo_" + i}
                        >
                          {item?.title}
                        </a>
                      </h4>
                    </div>
                    <div
                      id={"collapseTwo_" + i}
                      className="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby={"headingTwo_" + i}
                    >
                      <div className="panel-body">
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.description &&
                              item?.description.replace(regex, ""),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Faqs;

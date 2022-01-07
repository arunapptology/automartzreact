import React, { useState, useEffect } from "react";
import { testimonialData } from "../testimonial/testimonialData";
import CustomCarousel from "../ui/CustomCarousel";
import TopHeading from "../ui/TopHeading";

function Testimonials() {
  return (
    <>
      <div className="gtco-testimonials container testimonial-section-box pb-4">
        <TopHeading
          title={"Truested Feedback"}
          subtitle={"Feedback"}
          className={"text-center"}
        />

        <CustomCarousel
          settings={{
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            arrows: false,
          }}
        >
          {testimonialData?.map((item, i) => (
            <div className="card text-center" key={i}>
              {item?.image && (
                <img
                  className="card-img-top"
                  src={item?.image}
                  alt={item?.name}
                />
              )}
              <div className="card-body ">
                <h5>
                  {item?.name}
                  <br />
                  <span> {item?.designation} </span>
                </h5>
                <p className="card-text">{item?.post}</p>
              </div>
            </div>
          ))}
        </CustomCarousel>
      </div>
    </>
  );
}
export default Testimonials;
